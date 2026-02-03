import React,{useState} from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
function Registration(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [confirmPassword,setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleSuccess = (credentialResponse) => {
        // The credential is a JWT string
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("User Profile:", decoded);
        // Send this token to your backend!
    };
    async function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);
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
            alert('Something went wrong. Please ensure the server is running.');
        } finally {
            setIsLoading(false);
        }
    }
        
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
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    required/>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {/* <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log('Login Failed')}
                useOneTap // Optional: enables the 'One Tap' prompt in the corner
                /> */}
            </div>
        );
    }
;

export default Registration;