import './App.scss';
import LoginPage from './components/Authentication/LoginPage';
import BookRoom from './components/BookRoom/BookRoom';
import Homepage from './components/Homepage/Homepage';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReceiveRoom from './components/ReceiveRoom/ReceiveRoom';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/book-room">
              <BookRoom />
            </Route>
            <Route path="/receive-room">
              <ReceiveRoom />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
