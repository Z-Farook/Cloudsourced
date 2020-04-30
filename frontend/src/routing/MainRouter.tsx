import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";

interface IProps {}

const MainRouter: React.FC<IProps> = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/project" component={ProjectDetailPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
