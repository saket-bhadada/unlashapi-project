import passport from "passport";
import express from "express";

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