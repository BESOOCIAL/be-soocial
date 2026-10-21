import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  brief: z.string().min(10, 'Please provide details about your project brief (min 10 characters)'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select an estimated timeline'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  source: z.enum(['contact', 'start-a-project', 'service-detail']),
  // Honeypot field for bot mitigation - must remain empty
  _hp_verify: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
