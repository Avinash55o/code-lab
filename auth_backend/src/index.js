import express from "express"
import bcrypt from "bcrypt"
import {createUser} from "./db/index.db.js"
import {findUserbyname} from "./db/index.db.js"
import jwt from "jsonwebtoken"

const app= express()
app.use(express.json());

app.get('/',(_,res)=> res.json("healthy"))

app.listen(3000,()=>{
    console.log(`your server is listening on port 3000`)
})


//routes
//--- registering route---

// need to put in the env but for demo
const JWT_SECRET= "qwer-sdf-456-fghj";

app.post('/signup',async(req,res)=>{
    const {name, password}= req.body;

    if(!name || !password) return res.status(400).json("credentials required");

    //check if it is a existing user or not
    const existingUser= findUserbyname(name)
    if(existingUser){
        return res.status(409).json("you are already a user")
    } 

    //change the password into hash
    const hashpass =await bcrypt.hash(password, 10);

    //create user
    createUser({
        id:Date.now(),
        name,
        hashpass
    });

    res.status(200).json({message:"user created"});
    
})

// login route
    //take the req body and check the req body
    //check for existense
    //if not exisit send error that user not exist and if exist go 
    //match the pass
app.post('/login',async(req, res)=>{
    const {name, password}= req.body;

    if(!name || !password) return res.status(400).json({message:"credential are missing"});

    const user= findUserbyname(name);

    console.log("user to login",user)
    if(!user) return res.status(409).json({message:"this name of user is not there"});

    const match =await bcrypt.compare(password, user.hashpass);
    if(!match) return res.status(401).json({message:"invalid password"});

    const token= jwt.sign(
        {userId:user.id},
        JWT_SECRET,
        {expiresIn:"1h"}
    );
    
    return res.json({token})
});