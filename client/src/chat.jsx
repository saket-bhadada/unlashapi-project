import React,{useState,useEffect} from "react";
import io from 'socket.io-client';

const socket = io.connect("httpt://localhost:3000");

function App(){
    const [message,setmessage] = useState("");
    const [chat,setchat] = useState([]);
    useEffect(()=>{
        socket.on('message',(data)=>{
            setchat((prev)=>[...prev,data]);
        })
    },[]);

    const sendmessage = (username)=>{
        socket.emit('message',{username:{username},content:message});
        setmessage("");
    }
}