import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validation/inquiry';
import { createInquiry } from '@/lib/data/repository';

// In-memory IP tracking to prevent flooding
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Re-validation on Server
    const parseResult = inquirySchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          issues: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 2. Honeypot Verification: drop silently if filled
    if (data._hp_verify && data._hp_verify.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 });
    }

    // 3. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip) || 0;
    if (now - lastRequest < 3000) {
      // 3 second sliding window per IP
      return NextResponse.json(
        { error: 'Please wait a moment before submitting another inquiry.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    // 4. Persistence into Repository
    const inquiry = await createInquiry(data);

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry registered successfully with BE SOOCIAL.',
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Error processing inquiry:', err);
    return NextResponse.json(
      { error: 'Internal server error while recording inquiry' },
      { status: 500 }
    );
  }
}
