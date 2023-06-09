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
import RegulationManagement from './components/RegulationManagement/RegulationManagement';
import PrivateRoute from './components/Routes/PrivateRoute';
import PageNotFound from './components/Routes/PageNotFound';
import { Toaster } from 'react-hot-toast';
import ManagerRoute from './components/Routes/ManagerRoute';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route path="/" exact>
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/book-room">
              <PrivateRoute>
                <BookRoom />
              </PrivateRoute>
            </Route>
            <Route path="/receive-room">
              <PrivateRoute>
                <ReceiveRoom />
              </PrivateRoute>
            </Route>
            <Route path="/revenue-report">
              <ManagerRoute>
                <RevenueReport />
              </ManagerRoute>
            </Route>
            <Route path="/room-management">
              <RoomManagement />
            </Route>
            <Route path="/staff-management">
              <ManagerRoute>
                <StaffManagement />
              </ManagerRoute>
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
            <Route path="/regulation-management">
              <ManagerRoute>
                <RegulationManagement />
              </ManagerRoute>
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
