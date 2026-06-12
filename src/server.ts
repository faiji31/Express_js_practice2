import express, { type Application, type Request, type Response } from "express";
import {Pool} from "pg";
const app : Application = express()
const port = 5000

app.use(express.json())


const pool = new Pool({
    connectionString:"postgresql://neondb_owner:npg_cMmyIFvVS78H@ep-rough-wind-ap6fognu-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

const initDB = async()=>{

    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(

            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20),
            age INT,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

            )
            `)
            console.log("database connected succesfully!")
    } catch (error) {
        console.log(error)
        
    }
}
initDB()
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
    message:"User created successfully!",
    data: result.rows[0]
 })
} catch (error:any) {
     res.status(500).json({
    message:error.message,
    data: error
 })
    
}


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})