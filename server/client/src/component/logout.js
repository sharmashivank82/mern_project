import React, { useEffect } from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../App";

const Logout = ()=>{

    const {state,dispatch} = React.useContext(UserContext);
    const history = useHistory();
    //by promises method

    React.useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            history.push('/login',{replace:true});
            if(!res.status === 200)
            {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <>
            
        </>
    )
}

export default Logout;