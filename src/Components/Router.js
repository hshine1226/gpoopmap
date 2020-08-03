import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "Routes/Home";
import Login from "./Login";
import Join from "./Join";
import Header from "./Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/join" exact component={Join} />

        {/* 일치하는 route가 없다면  Home으로 Redirect 시킨다.*/}
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
