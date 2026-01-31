import passport from "passport";
import express from "express";

const auth = express.Router();

auth.get('/login',passport.authenticate('google',{
    scope:['profile','email']
}))