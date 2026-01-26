import express from "express";

const search = express.Router();

search.post("/",async(req,res)=>{
    const { searchQuery } = req.body;
    if(!searchQuery){
        return res.status(400).json({error:"Search query is required"});
    }else{
        try{
            api = process.env.API_KEY;
            url = `https://api.unsplash.com/photos/?client_id=${api}&query=${searchQuery}S`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            if(response.ok){
                return res.status(200).json({data});
            }else{
                return res.status(400).json({error:"Something went wrong"});
            }
        }catch(error){
        console.error(error);
        return res.status(500).json({error:"Something went wrong"});
    }
    }
    // console.log("Search query:", searchQuery);
    res.json({ message: "Search successful", images: [] });
});

export default search;