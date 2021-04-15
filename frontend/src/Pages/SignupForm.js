import React, { useContext, useState, useEffect } from 'react'
import { ContextStore } from '../ContextStore';
import { useHistory } from "react-router-dom";
import Select from "react-select";

export default function SignupForm() {
  const [formDetails, setFormDetails] = useState({email: "", password : "", firstName : "", lastName: ""})
  const [userType, setUserType] = useState()
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [ user, setUser ] = CurrentUser;
  const [ showSidebar, setShowSidebar] = SideBar;

  const history = useHistory()
  useEffect(() => {
    setShowSidebar(false)
  },[])

  const submitHandler = e => {
    e.preventDefault();
    handleRegister()
  }

  const userTypes = [
    { value: "Student", label: "Student" },
    { value: "Professor", label: "Professor" },
  ];

  const handleRegister = () => {
    const url = "http://localhost:8080/api/users/";
    const role = userType.value;
    const body = {
      firstName: formDetails.firstName,
      lastName: formDetails.lastName,
      email: formDetails.email,
      pwd: formDetails.password,
      Role: role
    }
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data !== null) {
          setUser(data);
          if (role === "Professor") {
            history.push("/register/professor");
          } else if (role === "Student") {
            history.push("/register/student");
          }
        }
      })
  }

  return (
    <form onSubmit = {submitHandler}>
      <div className = "form-inner">
        <h2>EduALL</h2>
        <div className = "form-group">

          <label htmlFor ="firstName">First name: </label>
          <input type = "firstName" name = "firstName" id = "firstName"  onChange = {e => setFormDetails({...formDetails,firstName: e.target.value})} value = {formDetails.firstName}/>
          <label htmlFor ="lastName">Last name: </label>
          <input type = "lastName" name = "lastName" id = "lastName"  onChange = {e => setFormDetails({...formDetails,lastName: e.target.value})} value = {formDetails.lastName}/>

          <label htmlFor ="email">Email: </label>
          <input type = "email" name = "email" id = "email"  onChange = {e => setFormDetails({...formDetails,email: e.target.value})} value = {formDetails.email}/>
          <label htmlFor ="password">Password: </label>
          <input type = "password" name = "password" id = "password" onChange = {e => setFormDetails({...formDetails,password: e.target.value})} value = {formDetails.password}/>
          <br/>
          <Select options={userTypes} value={userType} defaultValue = {userType} onChange = {setUserType}  placeholder="Select your type..."/>
        </div>
        <input type = "submit" value = "Register"/>
      </div>
    </form>
  )
}
