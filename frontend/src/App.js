import React, { useState } from 'react';
import LoginForm from './Pages/Loginform'
import RegisterPage from './Pages/RegisterPage';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { ContextStore } from './ContextStore';
import Sidebar from './Components/Sidebar/Sidebar'

export default function App() {
  const [ user , setUser ] = useState("");
  const [showSidebar,setShowSidebar] = useState(false);
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Switch>        
            <ContextStore.Provider value={{ CurrentUser: [user,setUser], SideBar: [showSidebar, setShowSidebar]}}>
                <Route path="/" exact component={LoginForm}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/dashboard" component={Dashboard}/>
            </ContextStore.Provider>
        </Switch>
      </Router>
    </div>
  );
}
