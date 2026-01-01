import { randomUUID } from "crypto";
import { redis } from "./redis.js";

const SESSION_TTL = 60 * 30; // 30 minutes

type SessionData = {
    userId: string;
    username: string;
};

/**
 * Create a session
 */
export async function createSession(data: SessionData): Promise<string> {
    const sessionId = randomUUID();

    await redis.set(
        `session:${sessionId}`,
        JSON.stringify(data),
        { EX: SESSION_TTL }
    );

    return sessionId;
}

/**
 * Get session
 */
export async function getSession(sessionId: string): Promise<SessionData | null> {
    const session = await redis.get(`session:${sessionId}`);
    if (!session) return null;

    return JSON.parse(session);
}

/**
 * Refresh session TTL
 */
export async function refreshSession(sessionId: string): Promise<void> {
    await redis.expire(`session:${sessionId}`, SESSION_TTL);
}

/**
 * Delete session (logout)
 */
export async function deleteSession(sessionId: string): Promise<void> {
    await redis.del(`session:${sessionId}`);
}
