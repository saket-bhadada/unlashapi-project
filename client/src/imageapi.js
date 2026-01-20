export const imageapi = async()=>{
    const response = await fetch(
        '/api/image?query=${searchTerm}'
    );
    if(!response.ok){
        throw new Error('something went wrong');
    }
    return response.json();
}