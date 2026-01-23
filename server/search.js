import express from "express";

const search = express.Router();

search.post("/",(req,res)=>{
    const { searchQuery } = req.body;
    console.log("Search query:", searchQuery);
    
    // Mock data for testing since we don't have Unsplash API key yet
    const mockImages = [
        { id: 1, url: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d', title: 'Forest' },
        { id: 2, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', title: 'Beach' },
        { id: 3, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', title: 'Nature' }
    ];
    
    res.json({ message: "Search successful", images: mockImages });
});

export default search;