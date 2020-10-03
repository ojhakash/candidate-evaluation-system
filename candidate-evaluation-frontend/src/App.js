import React, { Component } from "react";
import Register from "./views/Register/Register";
import { DependencyInjector } from "./dependency-injector/DependencyInjector";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signin from "./views/Signin/Signin";
import AddCandidate from "./views/AddCandidate/AddCandidate";
import ListCandidate from "./views/ListCandidate/ListCandidate";
import CandidateDetails from './views/CandidateDetails/CandidateDetails';

export default class App extends Component {
  constructor(props) {
    super(props);
    DependencyInjector.initialize();
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <div className="row  h-100">
    //       <div className="col-12 d-flex justify-content-center align-items-center h-100">
    //         <CircularProgress style={{ color: "#212529" }} />
    //       </div>
    //     </div>
    //   );
    // }
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/admin/register"
              render={(props) => (
                <Register baseState={this.state} routerProps={props} />
              )}
            />

            <Route
              path="/admin/login"
              render={(props) => (
                <Signin baseState={this.state} routerProps={props} />
              )}
            />

            <Route
              path="/dashboard"
              render={(props) => (
                <ListCandidate baseState={this.state} routerProps={props} />
              )}
            />

            <Route
              path="/candidate/:candidateId"
              render={(props) => (
                <CandidateDetails baseState={this.state} routerProps={props} />
              )}
            />

            <Route
              path="/"
              render={(props) => (
                <AddCandidate baseState={this.state} routerProps={props} />
              )}
            />

            {/* <ProtectedRoute
              path="/home"
              render={(props: any) => (
                <Home baseState={this.state} routerProps={props} />
              )}
              isLoggedIn={this.state.isLoggedIn}
            /> */}

            {/* <Redirect to="/login" from="/" /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}
