import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DISCORD_TOKEN: z.string().regex(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/),
  },
  client: {},
  runtimeEnv: {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  },
});
