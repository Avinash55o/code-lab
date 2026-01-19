//step1: Import express and its typescript type
import express, { Request, Response } from "express";
import cors from "cors"

//step2: create express app instance
const app = express();
//add middlewares
app.use(express.json());
app.use(cors({
    exposedHeaders: ['Retry-After']
}));

//step3: rate limiter state (in-memory)
let lastRequestTime = 0;

//step4: start a post route for /action endpoint
app.post('/action', (req: Request, res: Response) => {
    //step5: using date.now we take out the current time request so we can compare with the previous one
    const now = Date.now();

    //step6: calculate the time difference between now and lastRequestTime
    const diff = now - lastRequestTime

    //step7: lets check the rate limit if the its less then 5000(5s) then only allow to request
    if (diff < 5000) {
        //step8: Now calculate the retry after value to see how much time left by Math.ceil((5000- diff)/1000)
        //Math.ceil ensures user waits full remaining time
        const retryAfter = Math.ceil((5000 - diff) / 1000);

        //step9: Now return the responsce with 429 to many request
        return res.status(429).set("Retry-After", retryAfter.toString()).json({ message: 'too many requests' })
    }

    //step10: now update the lastRequestTime to now
    lastRequestTime = now;

    //step11: send success response true.
    res.json({ success: true });
})

//step12: Now start the http server.
app.listen(3000, () => {
    console.log('your server is running on port 3000')
})
