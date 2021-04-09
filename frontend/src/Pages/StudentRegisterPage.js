import React, { useContext, useState, useEffect } from 'react'
import { ContextStore } from '../ContextStore';
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useApi } from '../Components/useApi';

const classes = [
    { value: "CS 157C", label: "CS 157C" },
    { value: "CS 160", label: "CS 160" },
    { value: "CS 154", label: "CS 154" },
  ];

  const majors = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Software Engineering", label: "Software Engineering" },
    { value: "Political Science", label: "Political Science" },
    { value: "Business", label: "Business" },
  ];

export default function StudentRegisterPage() {
    const { CurrentUser, SideBar } = useContext(ContextStore);
    const [ showSidebar, setShowSidebar] = SideBar
    const [year, setYear] = useState("")
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [major, setMajor] = useState([]);
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
        console.log(major.value)
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
                <h2>Register Student</h2>
                <div className = "form-group">
                    <label htmlFor ="year">Year :</label>
                    <input type = "text" name = "year" id = "year" value={year} onChange={e=>setYear(e.target.value)}/>
                    <br/>
                    <label htmlFor ="major">Major :</label>
                    <Select options={majors} value={major} defaultValue={major} onChange={setMajor} placeholder="Select your major..."/>
                    <br/>
                    <label htmlFor ="studentId">Classes :</label>
                    <Select options={classes} value={selectedClasses} defaultValue={selectedClasses} onChange={setSelectedClasses} isMulti placeholder="Select your classes..."/>
                </div>
                <input type = "submit" value = "Login"/>
            </div>
        </form>
        </>
    )
}
