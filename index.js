import express from "express";
import bodyParser from "body-parser";
import { fetch } from "fetch";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 3000;

app.get("")

app.listen(port, ()=>{
    console.log(`running on port ${port}`);
})