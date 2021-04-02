import React from 'react'
import FileCard from '../Components/FileCard'

export default function FileUpload() {
    const fileData = [
        {
            name:"HW 1",
            description:"Database Class",
            date:"04/24/2021"
        }
    ]
    return(
        <div className="file-upload">
            {fileData.map(item=> {
                return <FileCard name={item.name} />
            })}
        </div>
    )
}