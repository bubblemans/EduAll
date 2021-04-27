import React, { useContext, useEffect } from 'react'
import { ContextStore } from '../ContextStore';

import '../App.css'

import Usercard from '../Components/Usercard'

function Userpage()
{
    const { CurrentUser, SideBar } = useContext(ContextStore);
    const [ showSidebar, setShowSidebar] = SideBar
    useEffect(() => {
        setShowSidebar(true)
    },[])

    return(
        <div className = "uP">
            <Usercard/>
        </div>
    );
}
export default Userpage