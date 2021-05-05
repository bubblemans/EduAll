import React, { useContext, useState, useEffect } from 'react'
import { ContextStore } from '../ContextStore';
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useAlert } from 'react-alert'

export default function SignupForm() {
  const [formDetails, setFormDetails] = useState({email: "", password : "", firstName : "", lastName: ""})
  const [userType, setUserType] = useState()
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [ user, setUser ] = CurrentUser;
  const [ showSidebar, setShowSidebar] = SideBar;
  const alert = useAlert()

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
    const url = process.env.REACT_APP_BASE_URL + ":8080/api/users/";
    const role = userType.value;
    const body = {
      firstName: formDetails.firstName,
      lastName: formDetails.lastName,
      email: formDetails.email,
      pwd: formDetails.password,
      role: userType.value
    }
    const userObject = {
      token:"",
      firstName: "",
      lastName: "",
      email:"",
      role:"",
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
          if (data.token){
            // Get the token out of this data
            userObject.token = data.token
            userObject.firstName = data.firstName
            userObject.lastName = data.lastName
            userObject.email = data.email
            userObject.role = data.role
            setUser(data);
            if (userType.value === "Professor") {
              alert.show("Professor account created successfully")
              history.push("/register/professor");
            } else if (userType.value === "Student") {
              alert.show("Student account created successfully")
              history.push("/register/student");
            }
          }else{
            alert.show(data.message)
          }
        }).catch(error => {
          console.log(error)
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
