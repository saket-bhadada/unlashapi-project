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
    
    return(
        <div>
            <div className="chat-window">
                {chat.map((msg, i) => (
                <p key={i}><strong>{msg.username}:</strong> {msg.content}</p>
                ))}
            </div>
            <input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}