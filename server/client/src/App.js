import React, { useReducer,createContex, createContext } from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Contact from "./component/Contact";
import About from "./component/About";
import Signup from "./component/Signup";
import Login from "./component/Login";
import {Route} from "react-router-dom";
import Errorpage from "./component/Errorpage";
import {Switch } from 'react-router-dom';
import Logout from './component/logout';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { initialState} from "../src/reducer/UseReducer";
import {reduce} from "../src/reducer/UseReducer";

//here we use context api
export const UserContext = createContext();

const Routing = ()=>{
  return(
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    
    <Route  path="/about">
      <About />
    </Route>

    <Route  path="/contact">
      <Contact />
    </Route>

    <Route  path="/login">
      <Login />
    </Route>

    <Route path="/signup">
      <Signup />
    </Route>

    <Route path="/logout">
      <Logout />
    </Route>

    <Route component={Errorpage} />
  </Switch>
  )
}



function App() {

  const [state,dispatch] = useReducer(reduce,initialState);

  return (           //page refresh ho raha hai thoda thoda   
  
    
    <>
      <UserContext.Provider value={{state, dispatch}}>
  
      <Navbar />
      <Routing />

    </UserContext.Provider>
    </>
  );
}

export default App;
