import express, { type Application, type Request, type Response } from "express";
import config from "./config/index.js";
import { pool } from "./db/index.js";
const app : Application = express()


app.use(express.json())




app.get('/', (req:Request, res:Response) => {
//   res.send('server is running !')
res.status(200).json({
    message:"server is running!",
    "author":"Expressjs part 2"
})
})

app.post('/',async(req:Request,res:Response)=>{
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

app.get('/api/users', async(req:Request,res:Response)=>{
    try {
        const result = await pool.query(`

            SELECT * FROM users
            
            `)
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

})

app.get('/api/users/:id', async(req:Request,res:Response)=>{
    const {id}= req.params;
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
            `,[id])

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
})

app.put("/api/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age, password, is_active } = req.body;

    try {
        const result = await pool.query(
            `
            UPDATE users
            SET
                name = COALESCE($1, name),
                password = COALESCE($2, password),
                age = COALESCE($3, age),
                is_active = COALESCE($4, is_active)
            WHERE id = $5
            RETURNING *;
            `,
            [name, password, age, is_active, id]
        );

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
});

app.delete("/api/users/:id",async(req:Request,res:Response)=>{
    const {id} = req.params;
    try {

        const result =await pool.query(`
            DELETE FROM users WHERE id = $1

            
            
            `,[id])
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
})

export default app