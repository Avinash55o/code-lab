import { redis } from "./redis.js";

const MAX_ATTEMPTS = 5;
const WINDOW_SECONDS = 10 * 60; // 10 minutes

export async function rateLimitLogin(ip: string): Promise<boolean> {
  const key = `login_attempts:${ip||'unknown'}`;

  const attempts = await redis.incr(key);

  // first attempt → start expiry window
  if (attempts === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  // block if limit exceeded
  if (attempts > MAX_ATTEMPTS) {
    return false; // BLOCK
  }

  return true; // ALLOW
}
