import { z } from 'zod';
import { insertMessageSchema, messages } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  messages: {
    create: {
      method: 'POST' as const,
      path: '/api/messages',
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  discord: {
    profile: {
      method: 'GET' as const,
      path: '/api/discord/profile',
      responses: {
        200: z.object({
          id: z.string(),
          username: z.string(),
          discriminator: z.string(),
          avatar: z.string().nullable(),
          banner: z.string().nullable(),
          accent_color: z.number().nullable(),
          global_name: z.string().nullable(),
        }),
        401: z.object({ message: z.string() }),
      },
    },
  },
  instagram: {
    profile: {
      method: 'GET' as const,
      path: '/api/instagram/profile',
      responses: {
        200: z.object({
          username: z.string(),
          profile_pic: z.string().nullable(),
          biography: z.string().nullable(),
          followers_count: z.number().optional(),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type MessageInput = z.infer<typeof api.messages.create.input>;
export type MessageResponse = z.infer<typeof api.messages.create.responses[201]>;
