import React, { useState } from "react";

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [images, setImages] = useState([]);

    async function handleSearch() {
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchQuery })
            });

            const data = await response.json();
            
            if (response.ok) {
               console.log("Search result:", data);
               if (data.images) {
                   setImages(data.images);
               } else {
                   alert(data.message || 'No images found');
               }
            } else {
                alert(data.message || 'Search failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please ensure the server is running.');
        }
    }

    async function topsearch(){
        try{
            const response = await fetch('/api/topsearches',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const data = await response.json();
            console.log("Top searches:",data);
            // if(response.ok){

            // }
        }
        catch(error){
            console.error(error);
            alert('Something went wrong. Please ensure the server is running.');
        }
    }
    
    return (
        <div>
            <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="search for image"
            />
            <button onClick={handleSearch}>Search</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {images.map((img, index) => (
                    <img 
                        key={img.id || index} 
                        src={img.urls?.small || img.urls?.regular} 
                        alt={img.alt_description || img.description || 'image'} 
                        style={{ width: '100%', borderRadius: '8px' }} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Search;