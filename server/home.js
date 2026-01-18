import express from "express";

const homeRouter = express.Router();

homeRouter.get("/",(req,res)=>{
    res.send("Home Page");
});

export default homeRouter;