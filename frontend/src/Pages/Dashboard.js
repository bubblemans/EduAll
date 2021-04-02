import React, { useContext, useEffect }from 'react'
import { ContextStore } from '../ContextStore';

export default function Dashboard () {
    const { SideBar } = useContext(ContextStore);
    const [ showSidebar, setShowSidebar] = SideBar
    useEffect(() => {
        setShowSidebar(true)
    },[])
    return(
        <h1>Home Page</h1>
    )
}