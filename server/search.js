import express from "express";

const search = express.Router();

search.post("/",(req,res)=>{
    const { searchQuery } = req.body;
    console.log("Search query:", searchQuery);
    res.json({ message: "Search successful", images: [] });
});

export default search;