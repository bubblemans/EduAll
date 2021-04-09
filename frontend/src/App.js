import React, { useState } from 'react';
import LoginForm from './Pages/Loginform'
import SignupForm from './Pages/SignupForm'
import RegisterPage from './Pages/RegisterPage';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { ContextStore } from './ContextStore';
import Sidebar from './Components/Sidebar/Sidebar'
import FileUpload from './Pages/FileUpload';
import './App.css'

export default function App() {
  const [ user,setUser ] = useState("");
  const [showSidebar,setShowSidebar] = useState(false);
  return (
    <div className="App">
      <Router>
        {showSidebar? <Sidebar />: null}
        <Switch>        
            <ContextStore.Provider value={{ CurrentUser: [user,setUser], SideBar: [showSidebar, setShowSidebar]}}>
                <Route path="/" exact component={LoginForm}/>
                <Route path="/signup" exact component={SignupForm}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/file" component={FileUpload}/>
            </ContextStore.Provider>
        </Switch>
      </Router>
    </div>
  );
}
