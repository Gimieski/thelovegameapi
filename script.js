const express = require('express');
const cors=require('cors')
const {Pool}=require('pg')
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3333

const pool=new Pool({
    connectionString:process.env.POSTGRES_URL
})

app.get('/postsGabriel',async(req,res)=>{
    try{
        const {rows}=await pool.query("SELECT * FROM posts WHERE user_name = 'Gabriel'")
        res.status(200).send(rows)
    }catch(err){
        return res.status(400).send(err)
    }
})

app.get('/postsGiulia',async(req,res)=>{
    try{
        const {rows}=await pool.query("SELECT * FROM posts WHERE user_name = 'Giulia'")
        res.status(200).send(rows)
    }catch(err){
        return res.status(400).send(err)
    }
})

//post
app.post('/postsGabriel',async(req,res)=>{
    const {user_name,user_post}=req.body
    try{
        const newPost=await pool.query("INSERT INTO posts(user_name,user_post) VALUES ($1,$2)",[user_name,user_post])
        return res.status(200).send(newPost.rows)
    }catch(err){
        return res.status(400).send(err)
    }
})

app.post('/postsGiulia',async(req,res)=>{
    const {user_name,user_post}=req.body
    try{
        const newPost=await pool.query("INSERT INTO posts(user_name,user_post) VALUES ($1,$2)",[user_name,user_post])
        return res.status(200).send(newPost.rows)
    }catch(err){
        return res.status(400).send(err)
    }
})


app.listen(PORT);