import React, { useContext, useState, useEffect } from 'react'
import { ContextStore } from '../ContextStore';
import { useHistory } from "react-router-dom";
import '../App.css'
import { useAlert } from 'react-alert'

export default function Loginform() {
  const [formDetails, setFormDetails] = useState({email: "",password : ""})
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [ user, setUser ] = CurrentUser
  const [ showSidebar, setShowSidebar] = SideBar
  const alert = useAlert()

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
    const userObject = {
      token:"",
      firstName: "",
      lastName: "",
      email:"",
      role:"",
    }
    let email = String(formDetails.email)
    let password = String(formDetails.password)
    console.log(email)
    console.log(password)
    const url = process.env.REACT_APP_BASE_URL + ":8080/api/users/"+ email+"/"+ password;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.token){
        userObject.token = data.token
        userObject.firstName = data.firstName
        userObject.lastName = data.lastName
        userObject.email = data.email
        userObject.role = data.role
        setUser(userObject)
        history.push("/dashboard")
        alert.show("Sign in successfull!")
      }else{
        alert.show(data.message)
      }
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
