import React, { use } from "react";
import {useState} from React;


function search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [images,setimages] = useState([]);
    async function handlesearch(){
        try{
            const response = await fetch('/api/search',{
                method:POST,
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({searchQuery})
            })
            const data = await response.json();
            if(response.ok && data.redirect){
                Navigate(data.redirect);
            }else if(!response.ok){
                alert(data.message||'search failed');
            }
        }catch(error){
            console.error(error);
            alert('Something went wrong. Please ensure the server is running.');
        }
    }
    async function handleout(e){
        if(handlesearch){
            e.preventDefault();
            setSearchQuery('');
        }
    }
    return(
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="search for image"/>
            <button onClick={handlesearch}>Search</button>
            <div>
                {images.map((img)=>(
                    <img key={img.id} src={img.url} alt={img.title}/>
                ))}
            </div>
        </div>
    )
}