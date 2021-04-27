import React from 'react'

export default function ClassCard({ code, name, days, time, grade }) {
    return(
        <div className="class-card">
        <div className="class-code" >{code}</div>
        <div className="label">Class name</div>
        <div className="class-details">{name}</div>
        <div className="class-details-container">
            <div style={{color:"grey"}}>Days</div> 
            <div style={{color:"grey"}}>Time</div>
        </div>
        <div className="class-details-container">
            <div>{days}</div> 
            <div>{time}</div>
        </div>
        <div className="label">Room name</div>
        <div className="class-details">{code}</div>
        <div className="class-grade">Grade: {grade}</div>
    </div>
    )
}