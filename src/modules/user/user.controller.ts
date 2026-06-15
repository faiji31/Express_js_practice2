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


const getAllUser = async(req:Request,res:Response)=>{
    try {
         const result = await userService.getAllUserDB(req.body)
            res.status(201).json({
                success:true,
                message:"User retirve successfully",
                data:result.rows
            })
         
    } catch (error:any) {
          res.status(500).json({
            success:false,
           message:error.message,
             data: error
 })
        
    }

}

const getSingleUser = async(req:Request,res:Response)=>{
    const {id}= req.params;
    try {

        const result = await userService.getSingleUSerDB(id as string)
       

            if(result.rows.length ===0){
                res.status(404).json({
                success:false,
                message:"User is not found!",
                data:{}
            })
            }
          
             res.status(201).json({
                success:true,
                message:"User retirve successfully",
                data:result.rows[0]
            })
    } catch (error:any) {
        res.status(500).json({
            success:false,
           message:error.message,
             data: error
 })
        
    }
}

const UpdateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age, password, is_active } = req.body;

    try {

        const result = await userService.updateUserDB(req.body,id as string)
        

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
                data: {}
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
}

const deleteUser = async(req:Request,res:Response)=>{
    const {id} = req.params;
    try {
        const result =await userService.deleteUserDB(id as string)

        
            if(result.rowCount ===0){
                  res.status(404).json({
                success:false,
                message:"User is not found!",
                data:{}
            })

            }
             res.status(201).json({
                success:true,
                message:"User Delete successfully",
                data:{}
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
    getAllUser,
    getSingleUser,
    UpdateUser,
    deleteUser
}