import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import ChatComponent from './components/ChatComponent';
// import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import MainComponent from './components/MainComponent';
import SignupComponent from './components/SignupComponent';

function App() {
  return (
    <>
    {/* <ChatComponent></ChatComponent> */}
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path={["/","/login"]} component={LoginComponent} />
            <Route exact path="/signup" component={SignupComponent} />
            <Route exact path="/home" component={MainComponent}/>
            <Route exact path="/chats/:id" component={ChatComponent} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
