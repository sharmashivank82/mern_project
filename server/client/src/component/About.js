import React from "react"
import {useHistory} from "react-router-dom";
const About = ()=>{

    const history = useHistory();
    const [userdata,setUserData] = React.useState({});

    const callAboutPage = async()=>{
        try{
            const res = await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            setUserData(data);
            if(!res.status===200){
                const error  = new Error(res.error);
                throw error;
            }
        }
        catch(err)
        {
            console.log(err);
            history.push('/login');
        }
    }

    //it will run only one time
    React.useEffect(()=>{   
        callAboutPage();
    },[]);

    return(
        <>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img src="https://www.exa.de/images/team/team-1.jpg" alt="Avatar"  className="about_img"/>
                    </div>

                    <div className="flip-card-back">
                        <h1>John Doe</h1> 
                        <p>Architect & Engineer</p> 
                        <p>We love that guy</p>
                    </div>
                </div>

                <form method="GET">
                    <br/>
                    <input type="text" value={userdata.name} placeholder="name" />
                    <br/>
                    <br/>
                    <input type="text" value={userdata.email} placeholder="Email" />
                    <br/>
                    <br/>
                    <input type="text" value={userdata.work} placeholder="Work" />
                    <br/>
                </form>
                <br/><br/>
            </div>
            
        </>
    )
}

export default About;