import React, { useContext, useState, useEffect } from 'react'
import { ContextStore } from '../ContextStore';
import { useHistory } from "react-router-dom";

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

    const verifyDetails = () => {
        let email = "admin@admin.com"
        let password = "admin123"

        if(formDetails.email == email && formDetails.password == password){
              console.log("Logged in");
              setUser(formDetails.name)
              // Push to the Home Page 
              history.push('/dashboard')

        }else {
            console.log("Details do not match!");
        }
    }
    return (
        <form onSubmit = {submitHandler}>
            <div className = "form-inner">
                <h2>EduALL</h2>
                {/* {(error != "") ? (<div className = "error">{error}</div>) : ""} */}
                <div className = "form-group">
                    <label htmlFor ="email">Email :</label>
                    <input type = "email" name = "email" id = "email"  onChange = {e => setFormDetails({...formDetails,email: e.target.value})} value={formDetails.email}/>
                </div>
                <div className = "form-group">
                    <label htmlFor ="password">Password :</label>
                    <input type = "password" name = "password" id = "password" onChange = {e => setFormDetails({...formDetails,password: e.target.value})} value={formDetails.password}/>
                </div>
                <input type = "submit" value = "Login"/>
            </div>
        </form>
    )
}
