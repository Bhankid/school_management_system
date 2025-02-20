// utils/cache.ts
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function getFromCache(key: string): Promise<number | null> {
  const value = await redis.get(key);
  return value ? parseFloat(value) : null;
}

export async function setInCache(key: string, value: number, ttlInSeconds: number): Promise<void> {
  await redis.set(key, value.toString(), "EX", ttlInSeconds);
}