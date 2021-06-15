import React from "react";
import { NavLink } from "react-router-dom";
const Errorpage = ()=>{
    return(
        <>
            <div id="error-page">
                <div class="content">
                <h2 class="header" data-text="404">
                404
                </h2>
                <h4 data-text="Opps! Page not found">
                Opps! Page not found
                </h4>
                <p>
                Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                </p>
                <div class="btns">
                <NavLink to="/">return home</NavLink>
                </div>
                </div>
            </div>
        </>
    )
}

export default Errorpage;