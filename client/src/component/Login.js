import React from "react"
import logo from "../images/login logo.png";
import { NavLink,useHistory } from "react-router-dom";

import {UserContext} from "../App";

const Login = ()=>{
    
    const {state,dispatch} = React.useContext(UserContext);

    const history = useHistory(); 
    const [user,setUser] = React.useState({
        email:"",
        password:""
    });

    const handleInput = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const loginUser = async(e)=>{
        e.preventDefault();
        const {email,password} = user;
        const res = await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        });
        const data = await res.json();

        if(res.status===400 || res.status===502 || !data){
            window.alert("Invalid Detais");
        }
        else{
            dispatch({type:"USER",payload:true})
            window.alert("Login Successfull");
            history.push("/");
        }
    }

    return(
        <div>
            <form method="POST">
                <label>Email : </label><br/>
                <input type="email" name="email" id="email" value={user.email} onChange={handleInput} placeholder="Enter your Email"/><br/><br/>

                <label>Password : </label><br/>
                <input type="password" name="password" id="password" value={user.password} onChange={handleInput} placeholder="Enter your password"/><br/><br/>

                <input onClick={loginUser} type="submit" value="Login"/>
            </form><br/>
            <div>
                <NavLink to="/signup">Create an account</NavLink>
            </div>
        </div>
    )
}

export default Login;