import React from "react"
import { useHistory } from "react-router";

const Contact = ()=>{

    const [userdata,setUserData] = React.useState({});
    const [message,setMessage] = React.useState("");

    const history = useHistory();
    const userContact = async()=>{
        try{
            const res = await fetch('/getdata',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
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
        }
    }

    //it will run only one time
    React.useEffect(()=>{   
        userContact();
    },[]);

    const handleInputs = (e)=>{
        setMessage(e.target.value);
    }

    const contactForm = async(e)=>{
        e.preventDefault();
        const name = userdata.name;
        const email = userdata.email;
        const phone = userdata.phone;
        const messagedata = message;

        const res = await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,phone,
                message:messagedata
            })
        });
        const data = await res.json();
        if(!data){
            console.log("message not send");
        }
        else{
            alert("message send");
            setMessage("");
        }
    }

    return(
        <>
            <div className="adjust">
                <img src="" alt="phone" />
                <div>Phone</div>
                <div>+91 111-890-7650</div>
            </div>
            <div className="adjust">
                <img src="" alt="Email" />
                <div>Email</div>
                <div>shi4@gmail.com</div>
            </div>
            <div className="adjust">
                <img src="" alt="Address" />
                <div>Address</div>
                <div>12/78 idhf</div>
            </div>
            <br/><br/>
            <div className="adjust1">
                <h1>Contact Detail's</h1>
                <form method="POST">
                    <div>
                        <input type="text" id="contact_form_name" name="name" value={userdata.name} placeholder="            your name" disabled/>
                    </div><br/>
                    <div>
                        <input type="email" id="contact_form_email" name="name" value={userdata.email} placeholder="           your email" disabled/>
                    </div><br/>
                    <div>
                        <input type="number" id="contact_form_phone" name="name" value={userdata.phone} placeholder="     Your Mobile Nuber" disabled/>
                    </div><br/>
                    <div>
                        <textarea cols="30" rows="5" name="message"
                        value={message} onChange={handleInputs} placeholder="message">
                        </textarea><br/>
                    </div>
                    <div>
                        <input type="submit" onClick={contactForm} value="submit"/><br/><br/>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Contact;