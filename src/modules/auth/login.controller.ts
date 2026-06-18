import type { Request, Response } from "express";
import { authService } from "./login.service.js";


const loginUser =async(req:Request,res:Response)=>{

    const result = await authService.loginUserintoDB(req.body)

    try {
        res.status(201).json({
                success:true,
                message:"User retirve successfully",
                data:result
            }) 
        
    } catch (error:any) {
         res.status(500).json({
            success:false,
           message:error.message,
             data: error
 })
    }

}

export const authController ={
    loginUser
}