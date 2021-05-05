import React, { useContext, useEffect }from 'react'
import { ContextStore } from '../ContextStore';
import '../App.css'

export default function VideoCallPage () {
    const { SideBar } = useContext(ContextStore);
    const [ showSidebar, setShowSidebar] = SideBar
    const url = "https://video-app-1664-6374-dev.twil.io/?passcode=05049216646374"
    const iframe = `<iframe height="1020" style="width: 100%;" scrolling="no" title="fx." src=${url} frameborder="no" allowtransparency="true" allowfullscreen="true"  allow="camera;microphone">Video</iframe>`; 
    // const [name,setName] = useState("")
    // const [roomNumber,setRoomNumber] = useState("")

    function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
    }

    useEffect(() => {
        setShowSidebar(true)
    },[])
        return (
            <div className="i-frame">
              <Iframe iframe={iframe} />,
            </div>
          );
    }

