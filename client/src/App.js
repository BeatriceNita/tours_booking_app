import React, { Component } from 'react';
import store from "./store";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import EditTour from './components/tourManagement/editTour';
import CreateTour from "./components/tourManagement/createTour";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import CreateReview from "./components/tourManagement/createReview";
import CreateRating from "./components/tourManagement/createRating";
import CreateBooking from "./components/bookingManagement/createBooking";

//Check for token to keep user logged in
if (localStorage.jwtToken) {
  //Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  //Decode token and get user info and exp
  const decoded = jwt_decode(token);

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000; //to get in milliseconds

  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ height: '100%' }}>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/editTour/:id" component = {EditTour} />
              <PrivateRoute exact path="/createTour" component={CreateTour} />
              <PrivateRoute exact path="/addBooking/:id" component={CreateBooking} />
              <PrivateRoute exact path="/addReview/:id" component={CreateReview} />
              <PrivateRoute exact path="/addRating/:id" component={CreateRating} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
