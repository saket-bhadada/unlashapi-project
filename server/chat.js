import express from "express";
import http, { METHODS } from "http";
import { WebSocket } from "http";
import { Server }  from "socket.io";

const chatapp = express.Router();
const server = http.createServer(chatapp);
const io = new WebSocket.Server({server},{
    cors:{
        origin:"http://localhost:3000",
        METHODS:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
});