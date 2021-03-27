import React, { useState } from 'react';
import LoginForm from './Components/Loginform'
import RegisterPage from './Components/RegisterPage';
import HomePage from './Components/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { ContextStore } from './ContextStore';
import { withRouter } from 'react-router-dom'

export default function App() {
  const [ user , setUser ] = useState("");
  const [showSidebar,setShowSidebar] = useState(false);
  return (
    <div className="App">
      <Router>
      <Route render={({ location, history }) => (
        <React.Fragment>
          {showSidebar ? 
          <SideNav
              onSelect={(selected) => {
                  const to = '/' + selected;
                  if (location.pathname !== to) {
                      history.push(to);
                  }
              }} 
          >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                  <NavIcon>
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Home Page 
                  </NavText>
              </NavItem>
              <NavItem eventKey="devices">
                  <NavIcon>
                      <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Other Page
                  </NavText>
              </NavItem>
            </SideNav.Nav>
        </SideNav>
        :
        null
        }
        <ContextStore.Provider value={{ CurrentUser: [user,setUser], SideBar: [showSidebar, setShowSidebar]}}>
            <Route path="/" exact component={withRouter(LoginForm)}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/home" component={withRouter(HomePage)}/>
        </ContextStore.Provider>
      </React.Fragment>
      )}
      />
      </Router>
    </div>
  );
}
