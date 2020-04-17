import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";

interface IProps {}

const MainRouter: React.FC<IProps> = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
