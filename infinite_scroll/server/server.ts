//step 1: import nessecory modules
import express from "express"
import { Request, Response } from "express";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}));

//step 2: Types to use in typescript
type post={
    id:number,
    title:string
}
//step 3: create fake database with the help of array.from
const posts: post[]= Array.from({length:1000},(_,i)=>({
    id:i+1,
    title: `Item#${i+1}`
}))


//step 4: create a get route to handle /posts?cursor=10@limit=20
app.get('/posts',(req:Request, res:Response)=>{
    //step 5: Read the search query from the url (corsos and limit)
    const limit:number = Number(req.query.limit) || 20;
    const cursor:number = Number(req.query.cursor) || 0;

    //step 6: find index of the corsor 
    const startIndex:number= cursor ===0? 0: posts.findIndex(i=>i.id === cursor)+1

    /*step 7: Now slice the array to get the next posts (now we will get all the posts)
            *slice(start, end)
            *we have startIndex from where we need to get the post
            *and statIndex + limit = end
    */
    const nextPosts: post[]= posts.slice(
        startIndex,
        startIndex+limit
    );

    /* step 8: take out the next corsor value
             *we can get it by taking out the last post's id from the nextPosts
             *if no posts remain then return null
             *we will use ternary expression -> condition? valueIfTrue :valueIfFalse
    */
   const nextcursor:number|null= nextPosts.length>0 ?nextPosts[nextPosts.length-1].id : null
   /*you can also use:
         * let nextCursor: number | null = null;

          if (nextPosts.length > 0) {
            nextCursor = nextPosts[nextPosts.length - 1].id;
          }

   */


    //step 9: send the response
    return res.json({
        posts: nextPosts,
        nextcursor
    })
})

//step 10:server listen on 3000
app.listen(3000,()=>{
    console.log("your server is running on 3000")
})