//step 1: install the typescript express cors (type cors)
//step 2: import neccesory models to the server file
import express from "express"
import { Request,Response } from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors({origin:"http://localhost:5173"}))
//step 3: create a fake database
const fakeData=[
    "apple","pineapple","orange","moon","sun"
]
//step 4: create type for the TS
type searchQuery={
    q?: string
}
/*step 5: create a get api endpoint at /search
         * exampel request: GET / search?q=apple */
         // In this request<params, resbody, reqbody,reqquery
app.get('/search',(req:Request<{},{},{},searchQuery>, res:Response )=>{
    // Step 6: Read the search query from the URL (?q=...)
         // - Query parameters are optional, so `q` may be undefined
         // - If `q` exists, normalize it to lowercase for case-insensitive search
         // - If `q` is missing, default to an empty string to avoid runtime errors
    const query= req.query.q?.toLowerCase()||"";

    //step 7: generate a random delay between 100ms to 800ms
    const delay= Math.random()* 700 +100;

    //step 8: use setTimeout function
    setTimeout(()=>{
        //step 9: filter the items based on substring match and send json reply syntex-->(setTimeout(function, millisecond,params(use in function but this is optional)))
        const filtererd=fakeData.filter(item=>item.toLowerCase().includes(query))
        res.json(filtererd)
    },delay)
})

//run the server
app.listen(3000,()=>{
    console.log("your backend is running on 3000")
})




