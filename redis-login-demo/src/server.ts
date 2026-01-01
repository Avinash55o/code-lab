import express from "express"
import { connectRedis } from "./redis.js";
import router from "./routes.js";
import cookieParser from "cookie-parser"
const app =express();

app.use(express.json());


app.use(cookieParser())
app.use('/api',router)
app.get('/',(_,res)=>{
    return res.json({message:"healthy"});
});


const PORT =3000; 

async function startServer(){
    //connect the redis in the startup
    await connectRedis()

    app.listen(PORT,()=>{
    console.log(`your server is host on localhost ${PORT}`)
})
}

startServer()