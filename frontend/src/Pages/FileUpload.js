import React, { useContext, useEffect } from 'react'
import FileCard from '../Components/FileCard'
import { ContextStore } from '../ContextStore';

export default function FileUpload() {
    const { CurrentUser, SideBar } = useContext(ContextStore);
    const [ showSidebar, setShowSidebar] = SideBar
    useEffect(() => {
        setShowSidebar(true)
    },[])

    const fileData = [
        {

            name:"HW 1",
            description:"Database Class",
            date:"04/12/2021"
        },
        {
            name:"Lecture 3",
            description:"Lecture 3 files",
            date:"04/11/2021"
        },
        {
            name:"Study guide",
            description:"a study guide for the test",
            date:"02/19/2021"
        },
        {
            name:"Final exam",
            description:"File for the final exam",
            date:"01/24/2021"
        }
    ]
    return(
        <div className="file-upload">
                <input type="file"></input>
            {fileData.map(item=> {
                return <FileCard name={item.name}  description={item.description} date={item.date}  />
            })}
        </div>
    )
}