import React from "react";
const Home = ()=>{

    const [username,setUserName] = React.useState('');
    const [show,setShow] = React.useState(true);

    const userhomepage = async()=>{
        try{
            const res = await fetch('/getdata',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(false);
            // if(!res.status===200){
            //     const error  = new Error(res.error);
            //     throw error;
            // }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    //it will run only one time
    React.useEffect(()=>{   
        userhomepage();
    },[]);

    return(
        <div className="home1">
        <h3>Welcome</h3>
        { show ? <h1> To see you</h1> : 
            <div>
            <h1>{username}</h1>
            <h2>You are a Mern Stack Developer</h2>
            </div> }
        </div>
    )
}

export default Home;