import { Router, type Request, type Response } from "express";
import { pool } from "../../db/index.js";

const router = Router()


router.post('/',async(req:Request,res:Response)=>{
 const {name,email,age,password} = req.body

try {
     const result = await pool.query(`

    INSERT INTO users(name,email,age,password) VALUES($1,$2,$3,$4)

    RETURNING *
    
    `,[name,email,age,password])
 res.status(201).json({
      success:true,
    message:"User created successfully!",
    data: result.rows[0]
 })
} catch (error:any) {
     res.status(500).json({
          success:false,
    message:error.message,
    data: error
 })
    
}


})



export const userRoute = router