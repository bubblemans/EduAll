import React, { useContext, useState, useEffect } from 'react'
import { ContextStore } from '../ContextStore';
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useApi } from '../Components/useApi';

export default function StudentRegisterPage() {
    const { CurrentUser, SideBar } = useContext(ContextStore);
    const [ showSidebar, setShowSidebar] = SideBar
    const [ user, setUser ] = CurrentUser;

    const [classes,setClasses] = useState([])
    const [majors,setMajors] = useState([])

    const [year, setYear] = useState("")
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [major, setMajor] = useState([]);
    const [sectionDataDB, setSectionDataDB] = useState([])
    const [classDataDB, setClassDataDB] = useState([])

    const [addClass, setAddClass] = useState({
        sectionId:"",
        courseName:"",
        semester: "",
        courseId: "",
    })

    const history = useHistory()

    useEffect(() => {
        setShowSidebar(false)
        const sectionUrl = `${process.env.REACT_APP_BASE_URL}:8081/eduall/section`
        fetch(sectionUrl)
        .then(res => res.json())
        .then(data => {
            setSectionDataDB(data)
        })

        const classUrl = `${process.env.REACT_APP_BASE_URL}:8081/eduall/course`
        fetch(classUrl)
        .then(res => res.json())
        .then(data => {
            setClassDataDB(data)
        })
    },[])

    const submitHandler = e => {
        e.preventDefault();
        saveDetails()
    }

    useEffect(()=> {
        let tempDeptArray= []
        let tempMajorsArray = []
        classDataDB.map(classObj => {
            if(!tempDeptArray.includes(classObj.department)) tempDeptArray.push(classObj.department)
        })

        tempDeptArray.map(classObj => {
            let classD = {
                label: classObj,
                value: classObj
            }
            tempMajorsArray.push(classD)
        })
        setMajors(tempMajorsArray)
    },[classDataDB])


    useEffect(()=> {
    let tempClassesArray = []

       sectionDataDB.map(section => {
           let classD = {
             label: section.course_name + " - " + section.section_id + ` ${section.semester} ${section.year} `,
             value: section.id
           }
           tempClassesArray.push(classD)
       })
       setClasses(tempClassesArray)
    },[sectionDataDB])


    const saveDetails = () => {

        const studentToken = String(user.token)
        let selectedClassesArray = []
        const studentYear = Number(year)
        const studentMajor = String(major.value)

        selectedClasses.map(option => {
            selectedClassesArray.push(Number(option.value))
        })
        const createStudentRequestUrl = `${process.env.REACT_APP_BASE_URL}:8081/eduall/student/${studentToken}/${studentYear}/${studentMajor}`

        const createClassesRequestUrl = `${process.env.REACT_APP_BASE_URL}:8081/eduall/grade/${studentToken}`
        
        fetch(createStudentRequestUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
        .then(res => res.json())
        .then(data => {
            if (data.id){
                fetch(createClassesRequestUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(selectedClassesArray)
                  })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    history.push('/dashboard')
                }).catch(error => {
                    console.log(error)
                })
            }
        }).catch(error => {
            console.log(error)
        })
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
