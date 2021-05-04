import React from 'react'
import { AiFillHome, AiOutlineUser } from 'react-icons/ai'
import { AiFillFilePdf } from 'react-icons/ai'
import { GoGraph } from 'react-icons/go'
import { FaVideo } from 'react-icons/fa'
import { SiGooglemessages } from 'react-icons/si'
import { SiGooglecalendar } from 'react-icons/si'
import { RiLogoutCircleFill } from 'react-icons/ri'


export const SidebarData = [
    {
        title:'Dashboard',
        path:'/dashboard',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title:'Video',
        path:'/video',
        icon: <FaVideo/>,
        cName: 'nav-text'
    },
    {
        title:'Message',
        path:'/message',
        icon: <SiGooglemessages />,
        cName: 'nav-text'
    },
    {
        title:'Files',
        path:'/file',
        icon: < AiFillFilePdf/>,
        cName: 'nav-text'
    },
    ,
    {
        title:'Profile',
        path:'/user',
        icon: < AiOutlineUser/>,
        cName: 'nav-text'
    },
    {
        title:'Logout',
        path:'/',
        icon: < RiLogoutCircleFill/>,
        cName: 'nav-text'
    }
]