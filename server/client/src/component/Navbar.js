import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import {UserContext} from "../App";

const Navbar = ()=>{
    const {state,dispatch} = React.useContext(UserContext);

    const RenderMenu = ()=>{
        if(state){
            return(
                <>
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li> */}
                    {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Registration</NavLink>
                    </li> */}
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </>
            )
        }
        else{
            return(<>
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                    </li>
                    
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Registration</NavLink>
                    </li>
                </>
            )
        }
    }

    return (
        <>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="#">
                    <img src={logo} alt="logo" height="100"/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Registration</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li> */}

                    <RenderMenu />
                </ul>
                </div>
            </div>
            </nav>
        </>
    )
}

export default Navbar;