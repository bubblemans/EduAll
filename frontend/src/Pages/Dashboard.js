import React, { useContext, useEffect, useState}from 'react'
import { ContextStore } from '../ContextStore';
import '../App.css'
import  ClassCard  from '../Components/ClassCard'
import { useAlert } from 'react-alert'

export default function Dashboard () {
    const { CurrentUser, SideBar } = useContext(ContextStore);
    const [ showSidebar, setShowSidebar] = SideBar
    const alert = useAlert()
    const [sectionDataDB, setSectionDataDB] = useState([])
    const [classDataDB, setClassDataDB] = useState([])
    const [classNames, setClassNames] = useState()
    const [classData,setClassData] = useState([])
    const [ user, setUser ] = CurrentUser;

    useEffect(() => {
        const token = user.token
        const sectionUrl = `${process.env.REACT_APP_BASE_URL}:8081/eduall/section/${token}`
        fetch(sectionUrl)
        .then(res => res.json())
        .then(data => {
            setSectionDataDB(data)
        })

        setShowSidebar(true)
        const classUrl = `${process.env.REACT_APP_BASE_URL}:8081/eduall/course`
        fetch(classUrl)
        .then(res => res.json())
        .then(data => {
            setClassDataDB(data)
        })

    },[])

    useEffect(()=>{
        const tempArray = new Map([])
        classDataDB.map(classObject=>{
            if(!tempArray.get(classObject.name)){
                tempArray.set(classObject.name,classObject.title)
            }
        })
        setClassNames(tempArray)
    },[classDataDB])

    useEffect(()=>{
        const tempClassArray = []
        sectionDataDB.map(section => {
            const classD = {
                code : section.course_name,
                days : section.days,
                time :section.timeslot,
                name : classNames.get(section.course_name)
            }
            tempClassArray.push(classD)
        })
        setClassData(tempClassArray)
    },[classNames,sectionDataDB])


    const colors = ["#9463F7","#3e8ef7","#FAA700","#ff4c52","#11C26D","#F57D1B","#757575","#0bb2d4","#9463F7","#3e8ef7","#FAA700","#ff4c52","#11C26D","#F57D1B","#757575","#0bb2d4","#9463F7","#3e8ef7","#FAA700","#ff4c52","#11C26D","#F57D1B","#757575","#0bb2d4"]
    return(
        <div className="dashboard">
            <div className="welcome">
                DashBoard
            </div>
            <div className="heading">Classes</div>
            <div className="container">
                {classData.map((item,i)=> {
                    return(
                        <ClassCard code={item.code} name={item.name} days={item.days} time={item.time} color={colors[i]}/>
                    )
                })}
            </div>
        </div>
    )
}