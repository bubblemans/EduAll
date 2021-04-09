import React, { useContext, useState, useEffect } from 'react'
import { ContextStore } from '../ContextStore';
import { useHistory } from "react-router-dom";
import '../App.css'

export default function Loginform() {
  const [formDetails, setFormDetails] = useState({email: "",password : ""})
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [ user, setUser ] = CurrentUser
  const [ showSidebar, setShowSidebar] = SideBar
  const history = useHistory()
  useEffect(() => {
      setShowSidebar(false)
  },[])

  const submitHandler = e => {
    e.preventDefault();
    verifyDetails()
  }

  const handleSignUp = () => {
    history.push("/signup");
  }

  const verifyDetails = () => {
    let email = formDetails.email;
    let password = formDetails.password;
    const url = "http://localhost:8080/api/users/" + email + "/" + password;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        history.push("/dashboard")
      })

  }
  return (
    <form onSubmit = {submitHandler}>
      <div className = "form-inner">
        <h2>EduALL</h2>
        <div className = "form-group">
          <label htmlFor ="email">Email :</label>
          <input type = "email" name = "email" id = "email"  onChange = {e => setFormDetails({...formDetails,email: e.target.value})} value={formDetails.email}/>
        </div>
        <div className = "form-group">
          <label htmlFor ="password">Password :</label>
          <input type = "password" name = "password" id = "password" onChange = {e => setFormDetails({...formDetails,password: e.target.value})} value={formDetails.password}/>
        </div>
        <input class='signin-input' type = "submit" value = "Login"/>
        <input class='signin-input' type = "submit" value = "Signup" onClick={handleSignUp}/>
      </div>
    </form>
  )
}
