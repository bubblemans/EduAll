import React, { useContext, useEffect }from 'react'
import { ContextStore } from '../ContextStore';
import '../App.css'
import  ClassCard  from '../Components/ClassCard'

export default function Dashboard () {
    const { SideBar } = useContext(ContextStore);
    const [ showSidebar, setShowSidebar] = SideBar
    const classData = [
        {
            code: "CS 147",
            name: "Computer Architecture",
            days: "M/W",
            time: "7:30 AM - 8:45 AM",
            grade: "A (90.37)"
        },
        {
            code: "CS 151",
            name: "Object Oriented Programming",
            days: "M/W",
            time: "7:30 AM - 8:45 AM",
            grade: "A (90.37)"
        },
        {
            code: "CS 160",
            name: "Software Engineering",
            days: "M/W",
            time: "7:30 AM - 8:45 AM",
            grade: "A (90.37)"
        },
        {
            code: "CS 157C",
            name: "NoSQL",
            days: "M/W",
            time: "7:30 AM - 8:45 AM",
            grade: "A (90.37)"
        }, 
        {
            code: "CS 157C",
            name: "NoSQL",
            days: "M/W",
            time: "7:30 AM - 8:45 AM",
            grade: "A (90.37)"
        },
    ]
    useEffect(() => {
        setShowSidebar(true)
    },[])

    return(
        <div className="dashboard">
            <div className="welcome">
                DashBoard
                <span>Welcome Back!</span>
            </div>
            <div className="heading">Classes</div>
            <div className="container"> 
                {classData.map((item)=> {
                    return(
                        <ClassCard code={item.code} name={item.name} days={item.days} time={item.time} grade={item.grade}/>
                    )
                })}
            </div>
        </div>
    )
}