import { Request, Response } from "express"
import express from "express"
import { createSession, getSession, deleteSession, refreshSession } from "./sessions.js";
import { rateLimitLogin } from "./redisRateLimiter.js";

const router = express.Router();


router.post('/login', async (req: Request, res: Response) => {
    //this is for the rate limit
    const IP= req.ip||'unknown';
    if(!IP) return res.status(400).json({error:"unable to identify ip address"});
    const allowed= await rateLimitLogin(IP);
    if(!allowed) return res.status(429).json({error:"too many login attempts"})

    //start of the login code.
    const { username } = req.body
    // Assume user is valid
    const sessionId = await createSession({
        userId: "123",
        username,
    });

    res.cookie("sessionId", sessionId, {
        httpOnly: true,
        sameSite: "lax",
    });

    res.json({ message: "Logged in" });
})

export default router