import React,{useState} from "react";

function Registration(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [confirmPassword,setConfirmPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await fetch('/api/register',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({email,password,confirmPassword}),
            })
            const data = await response.json();
            if(response.ok&&data.redirect){
                navigate(data.redirect);
            }else if(!response.ok){
                alert(data.message||'registration failed');
            }
        }catch(error){
            console.log(error);
        };
        const navigate = useNavigate();
        
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                    <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    required/>
                    <input
                    type="confirm password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    required/>
                    <button type="submit">Register</button>
                </form>
                
            </div>
        );
    }
};