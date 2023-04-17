import './App.scss';
import { FaReact } from 'react-icons/fa';
import LoginPage from './components/Authentication/LoginPage';
import Homepage from './components/Homepage/Homepage';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route path="/" exact>
              <div className='d-flex align-items-center gap-2 bg-dark bg-gradient text-white p-2'>
                <span><FaReact className='App-logo' /></span>
                <span>Hotel Management</span>
              </div>
              <Homepage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
