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
import RoomManagement from './components/RoomManagement/RoomManagement';
import StaffManagement from './components/StaffManagement/StaffManagement';
import ServiceManagement from './components/ServiceManagement/ServiceManagement';
import CustomerManagement from './components/CustomerManagement/CustomerManagement';
import ServicePayment from './components/ServiceUsingPayment/ServicePayment';
import RevenueReport from './components/RevenueReport/RevenueReport';

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
            <Route path="/revenue-report">
              <RevenueReport />
            </Route>
            <Route path="/room-management">
              <RoomManagement />
            </Route>
            <Route path="/staff-management">
              <StaffManagement />
            </Route>
            <Route path="/service-management">
              <ServiceManagement />
            </Route>
            <Route path="/customer-management">
              <CustomerManagement />
            </Route>
            <Route path="/service-using-payment">
              <ServicePayment />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
