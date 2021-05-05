import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import EdiText from 'react-editext';
import { ContextStore } from "../ContextStore";
import photo from "./myphoto.png";

function Usercard() {
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [showSidebar, setShowSidebar] = SideBar;
  const [user, setUser] = CurrentUser;

  const [name, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [password, setPassword] = useState(user.pwd);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  useEffect(() => {
    setShowSidebar(true);
  }, []);

  const handleSaveFirst = (val) => {
    console.log("Edited Value -> ", val);
    setfirstName(val);
  };

  const handleSaveLast = (val) => {
    console.log("Edited Value -> ", val);
    setlastName(val);
  };

  const handleSaveBio = (val) => {
    console.log("Edited Value -> ", val);
    setBio(val);
  };

const changeInfo = () => {
    const url = process.env.REACT_APP_BASE_URL + ":8080/api/users/" + user.id;
    const body = {
      firstName: name,
      lastName: lastName,
      email : user.email,
      bio: bio,
      pwd : user.pwd
    };
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
  };

  return (
    <div className="Usercard">
      <div className="upper-container"></div>
      <div className="lower-container">
        <div className="image-container">
          <img
            src={photo}
          />
        </div>
        <div className="info-container" style={{ flex: 1 }}>
          <h3>
            {" "}
            First Name :
            <EdiText type="text" value={user.firstName} onSave={handleSaveFirst} />
            Last Name :
            <EdiText type="text" value={user.lastName} onSave={handleSaveLast} />
          </h3>

          <h4>Email :<br></br>{user.email}</h4>
          <h5>
            Biography :
            <EdiText type="text" value={user.bio} onSave={handleSaveBio} />
          </h5>
        </div>
        <div className="example_a">
          <button onClick={changeInfo}> Edit Profile</button>{" "}
        </div>
      </div>
    </div>
  );
}
export default Usercard;