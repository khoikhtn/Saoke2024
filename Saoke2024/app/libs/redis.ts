import { createClient } from "redis";

const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis client error', err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

export { redisClient, connectRedis };