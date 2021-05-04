import React, { useContext, useEffect } from 'react'
import { ContextStore } from '../ContextStore';

import '../App.css'

import Usercard from '../Components/Usercard'

function Userpage()
{
    return(
        <div className = "uP">
            <Usercard/>
        </div>
    );
}
export default Userpage