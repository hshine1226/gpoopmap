import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "../Routes/Home";
import Join from "../Routes/Join";
import Login from "../Routes/Login";
import Header from "./Header";
import Add from "./Add";
import Profile from "../Routes/Profile";
import SnackBar from "./SnackBar";

export default (props) => {
  return (
    <Router>
      <>
        <Header />
        <SnackBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/join" exact component={Join} />
          <Route path="/add" exact component={Add} />
          <Route path="/profile" exact component={Profile} />

          {/* 일치하는 route가 없다면  Home으로 Redirect 시킨다.*/}
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};
