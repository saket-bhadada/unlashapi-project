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
            <div></div>
        );
    }
};