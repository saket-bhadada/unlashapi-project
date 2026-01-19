import React from "react";
import {useState} from React;


function search() {
    const [searchQuery, setSearchQuery] = useState('');
    async function handlesearch(){
        try{
            const response = await fetch('/api/search',{
                method:POST,
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({searchQuery})
            })
        }catch(error){}
    }
    return(
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
    )
}