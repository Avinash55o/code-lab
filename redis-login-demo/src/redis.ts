import {createClient} from "redis"

export const redis = createClient();

redis.on('error', err=> console.log("redis client error", err))

export async function connectRedis(){
    await redis.connect();
    console.log("connected to redis")
}