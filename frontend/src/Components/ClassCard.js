import React from 'react'
import '../App.css'
export default function ClassCard({ code, name, days, time, color }) {
    return(
        <div className="class-card" style={{backgroundColor:color}}>
        <div className="class-code" >{code}</div>
        <div className="label">Class name</div>
        <div className="class-details">{name}</div>
        <div className="class-details-container">
        <div style={{color:"white"}}>Days</div> 
        <div style={{color:"white"}}>Time</div>
        </div>
        <div className="class-details-container">
            <div>{days}</div> 
            <div>{time}</div>
        </div>
        <div className="label">Room name</div>
        <div className="class-details">{code}</div>
    </div>
    )
}