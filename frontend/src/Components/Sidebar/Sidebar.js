import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons'
import './Navbar.css'

export default function Navbar() {
    return(
        <>
         <IconContext.Provider value={{'color':"white"}}>
            <nav className={'nav-menu active'}>
                <ul className='nav-menu-items' >
                    <li className="navbar-toggle">
                        <div>EduAll</div>
                    </li>
                    {SidebarData.map((item,index)=> {
                        if (item.title == "Video") {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={{ pathname: "https://video-app-1664-6374-dev.twil.io/?passcode=05049216646374" }} target="_blank">
                                        {item.icon}
                                       <span> {item.title}</span>
                                    </Link>
                                </li>
                            )
                        } else {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                       <span> {item.title}</span>
                                    </Link>
                                </li>
                            )
                        }
                    })}
                </ul>
            </nav>
          </IconContext.Provider>
        </>
    )
}