import React from 'react'
import '../App.css'
export default function FileCard ({ name, description, date  }) {
    
    return(
        <div className="file-card"> 
           <div> {name} </div>
           <div> {description} </div>
           <div> {date} </div>
        </div>
    )
}
