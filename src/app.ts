import express, { type Application, type Request, type Response } from "express";
import config from "./config/index.js";
import { pool } from "./db/index.js";
import { userRoute } from "./modules/user/user.routes.js";
import { profileRoute } from "./modules/profile/profile.route.js";
import { authroute } from "./modules/auth/login.route.js";
import fs from "fs"
const app : Application = express()


app.use(express.json())

app.use((req, res, next) => {
  console.log('Method-Url-Time:',req.method, req.url, Date.now());

  const log = `Method=>${req.method} Time=>${ Date.now()} Url$=>{req.url}`

  fs.appendFile("logger.txt",log,(err)=>{
    console.log(err)
})
  next();
});



app.use('/api/users',userRoute)
app.use('/api/profiles',profileRoute)
app.use('/api/auth',authroute)


 

app.get('/', (req:Request, res:Response) => {
//   res.send('server is running !')
res.status(200).json({
    message:"server is running!",
    "author":"Expressjs part 2"
})
})










export default app