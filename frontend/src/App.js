import React, { useState } from 'react';
import LoginForm from './Pages/Loginform'
import SignupForm from './Pages/SignupForm'
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { ContextStore } from './ContextStore';
import Sidebar from './Components/Sidebar/Sidebar'
import FileUpload from './Pages/FileUpload';
import StudentRegisterPage from './Pages/StudentRegisterPage';
import ProfessorRegisterPage from './Pages/ProfessorRegisterPage';
import VideoCallPage from './Pages/VideoCallPage'
import Userpage from './Pages/Userpage';
import Chat from './Pages/Chat';
import './App.css'

export default function App() {
  const [ user,setUser ] = useState({
    token:"",
    firstName: "",
    lastName: "",
    email:"",
    role:"",
  });
  const [showSidebar,setShowSidebar] = useState(false);
  return (
    <div className="App">
      <Router>
        {showSidebar? <Sidebar />: null}
        <Switch>
            <ContextStore.Provider value={{ CurrentUser: [user,setUser], SideBar: [showSidebar, setShowSidebar]}}>
                <Route path="/" component={LoginForm} exact/>
                <Route path="/signup" component={SignupForm}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/file" component={FileUpload}/>
                <Route path="/video" component={VideoCallPage}/>
                <Route path="/register/student" component={StudentRegisterPage}/>
                <Route path="/register/professor" component={ProfessorRegisterPage}/>
                <Route path="/user" component={Userpage}/>
                <Route path="/message" component={Chat}/>
            </ContextStore.Provider>
        </Switch>
      </Router>
    </div>
  );
}
