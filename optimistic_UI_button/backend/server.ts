// STEP 1: Import required packages
// express → create server & APIs
// cors → allow frontend to talk to backend
import express, { Request, Response } from "express";
import cors from "cors";

// STEP 2: Create express app
const app = express()

// STEP 3: Middlewares
// express.json() → read JSON body from requests
// cors() → allow requests from frontend (Vite runs on 5173)
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))


// STEP 4: Fake database value
// This simulates a DB field (likes count)
let likes: number = 0;

// STEP 5: POST API to handle "like" action
// POST is used because we are CHANGING server data
app.post('/like', (req: Request, res: Response) => {
    // step 6: Now lets simulating failure (use to simulate the real backend problem errors(network issue, db fail))
    const shouldfail = Math.random() < 0.2 // 2 out of 10 will fail.

    // step 7: add a artificial delay to simulate network latency, database processing time using setTimeout() and delay it for the 500ms
    setTimeout(() => {
        // STEP 8: If failure happens → send error response
        if (shouldfail) {
            return res.status(500).json({ message: 'faild to like' });
        };
        // STEP 9: Success case
        // Increase likes count
        likes += 1;
        // Send updated likes back to frontend
        res.json({ likes });
    }, 500);
})


// STEP 10: Start server
app.listen(3000, () => {
    console.log('your server is listening on 3000')
})