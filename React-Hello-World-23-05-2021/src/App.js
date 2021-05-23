import logo from './logo.svg';

import React, { useState, Component } from 'react';
import Home from "./Pages/Home"

// componenet tyopes 

// they had class based componenets 
// they asked me to port this class based into functional component

// function base is 45 % faster than class based cmopoenet {}

  // 1. class based Component nobody create a class based compoenet
  // 2. functional compoenet
  // ==> render is the prime thing in ract compoenent 
  // whatever we have in render will be displayed in the browser
class MyItems extends React.Component{  // Inheritance 
  // render the compoenet to UI
  render(){
    return <div>
        <Home></Home>
    </div>
      {/* <ul>
        <li> List Item 1</li>
        <li> List Item 2</li>
        <li> List Item 3</li>
        <li> List Item 4</li>
        <li> List Item 5</li>
      </ul>
      <button  onClick={(e)=>alert("clicked on "+e.target.name)}> Notify me</button>
      <Login myData="myData"/> */}
  }
}

export function Login(props){
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const  handleSubmit=(e)=>{
    if(userName===password){
      alert("Success ")
    }
    else
    alert("Failed to login ")
  }
  
  const  hanleChange=(e)=>{
    //console.log(e.target)
     let name=e.target.name;
     if(name ==="user"){
      setUserName(e.target.value)
     }if (name==="pass"){
      setPassword(e.target.value)
     }
  }

    return(
    <div>

      UserName : {userName}<br/>
      Password : {password}
      <form onSubmit={handleSubmit}>
      User Name <input name ="user" type="text" onChange={hanleChange} ></input>
      password <input name="pass" type="text" onChange={hanleChange} ></input>
      <button>Saome Value {props.myData}</button>
      </form>
    </div>
    )
  }



export default MyItems
