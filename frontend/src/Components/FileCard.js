import React from 'react'
import '../App.css'
export default function FileCard ({ name, description, date  }) {
    
    return(
        <div className="file-card"> 
           <button className = "cardButton" onClick={() => {alert(name+' downloaded')}}>{name}</button>
           <div> {description} </div>
           <div> {date} </div>
        </div>
    )
}
