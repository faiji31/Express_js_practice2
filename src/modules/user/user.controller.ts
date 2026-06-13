import type { Request, Response } from "express"
import { pool } from "../../db/index.js"
import { userService } from "./user.service.js"


const createUser = async(req:Request,res:Response)=>{
//  const {name,email,age,password} = req.body

try {
    const result = await userService.createUserIntoDB(req.body)
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


}


export const UserController = {
    createUser,
}