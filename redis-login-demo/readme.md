# Session-Based Login with Redis (Local Setup)

This is a small backend project that demonstrates **session-based authentication** using **Redis** and **HTTP-only cookies**.

Redis is used to:
- Store user sessions
- Handle automatic session expiry (TTL)
- Support rate-limited login attempts

This project uses **Redis locally** (no cloud Redis).

---

## How It Works (High Level)

1. User logs in
2. Server creates a `sessionId`
3. Session data is stored in Redis with a TTL
4. `sessionId` is sent to the browser as a cookie
5. On each request, the cookie is used to fetch the session from Redis

If Redis restarts → sessions are lost (expected behavior).

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- Express
- Redis (local)
- Cookies (sessionId)

---

##  Features

- Session-based login (no JWT)
- Redis-backed session storage
- Login rate limiting using Redis

---

##  Project Structure

```txt
src/
├── server.ts              # App entry point
├── redis.ts               # Redis client & connection
├── sessions.ts            # Session create / read / delete 
├── redisRateLimiter.ts    # Login rate limiter using Redis
└── authRoutes.ts          # Login & logout routes
```
---
##  TO start the Project

```bash
# need to start the redis locally and if you don't have then install it.
sudo systemctl start redis-server  

# run the server
pnpm dev
```