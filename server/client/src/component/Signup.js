import React from "react";
import logo from "../images/signup logo.png";
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,useHistory} from "react-router-dom";


const Signup = ()=>{
    const history = useHistory();
    const [user,setUser] = React.useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:""
    });

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user,[name]:value});
    }

     //we use fetch instead of axios

    const PostData = async(e)=>{      
        e.preventDefault();
        const {name,email,phone,work,password,cpassword} = user;
        const res = await fetch("/register",{
            method:"POST",
            headers:{
                        "Content-Type":"application/json"
                   },
            body:JSON.stringify({ name,email,phone,work,password,cpassword })
        });
        const data = await res.json();
        if(res.status === 422 || !data)
        {
            window.alert("Invalid Registration");
            console.log("invalid registration");
        }
        else
        {
            window.alert("Registration successfull");
            console.log("Registration successfull");
            history.push('/login');
        }
    }

    return(
        <>
            <section className="ok2">
                <div className="ok">
                    <form method="POST" onSubmit={PostData}>
                    <label>Name : <i class="zmdi zmdi-account"></i> </label><br/>
                    <input type="text" name="name" id="name" value={user.name} onChange={handleInput} placeholder="enter your name"/><br/><br/>
                    <label>Email : </label><br/>
                    <input type="email" name="email" id="email" value={user.email} onChange={handleInput} placeholder="enter your email"/><br/><br/>
                    <label> Phone: </label><br/>
                    <input type="number" name="phone" id="phone" value={user.phone} onChange={handleInput} placeholder="enter your mobile"/><br/><br/>
                    <label> Work: </label><br/>
                    <input type="text" name="work" id="work" value={user.work} onChange={handleInput} placeholder="enter your profession"/><br/><br/>
                    <label> Password: </label><br/>
                    <input type="password" name="password" id="password" value={user.password} onChange={handleInput} placeholder="enter your password"/><br/><br/>
                    <label> Confirm Password: </label><br/>
                    <input type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInput} placeholder="enter your password"/><br/><br/>
                    <input type="Submit" value="Register"/><br/><br/>
                    </form>
                </div>
                <div>
                    <NavLink to="/login">Already have an account</NavLink>
                </div>
            </section>
        </>
    )
}

export default Signup;