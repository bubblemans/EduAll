import React, { useContext, useState, useEffect } from 'react'
import { ContextStore } from '../ContextStore';
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useApi } from '../Components/useApi';

  const departments = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Software Engineering", label: "Software Engineering" },
    { value: "Political Science", label: "Political Science" },
    { value: "Business", label: "Business" },
  ];

export default function ProfessorRegisterPage() {
    const [year, setYear] = useState("")
    const { CurrentUser, SideBar } = useContext(ContextStore);
    const [ user, setUser ] = CurrentUser
    const [ showSidebar, setShowSidebar] = SideBar
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [department, setDepartment] = useState([]);
    const { fetchData } = useApi()

    const history = useHistory()
    useEffect(() => {
        setShowSidebar(false)
    },[])

    const submitHandler = e => {
        e.preventDefault();
        saveDetails()
    }

    const saveDetails = () => {
        selectedClasses.map(option => {
            console.log(option.value)
        })
        console.log(department.value)
        console.log(year)

        // const requestUrl = `/eduall/student/${token}/${year}/${major}`

        // const { data, error } = fetchData("POST",requestUrl)

        // Push to the Home Page 
        history.push('/dashboard')
    }  

    return (
        <>
        <form onSubmit = {submitHandler}>
            <div className = "form-inner">
                <h2>Register Professor</h2>
                <div className = "form-group">
                    <label htmlFor ="studentId">Year :</label>
                    <input type = "text" name = "year" id = "year" onChange = {e => setYear(e.target.value)}/>
                    <br/>
                    <label htmlFor ="department">Department :</label>
                    <Select options={departments} value={department} defaultValue={department} onChange={setDepartment} placeholder="Select your Department..."/>
                    <br/>
                </div>
                <input type = "submit" value = "Login"/>
            </div>
        </form>
        </>
    )
}
