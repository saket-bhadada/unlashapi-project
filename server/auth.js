import passport from "passport";
import express from "express";
import pg, { Client } from "pg";

const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
const auth = express.Router();

auth.get('/login',
    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/registration"
    })
)

auth.post('/registration',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if(password !== confirmpassword){
        return res.status(400).json({error:"Password does not match"});
    }
    try{}catch(error){        
        res.redirect('/registration');
        return(error);
    }
});