import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectPage from "../pages/ProjectPage";

import UserProjectsPage from "../pages/UserProjects";
import CreateProjectPage from "../pages/CreateProjectPage";

interface IProps {}

const MainRouter: React.FC<IProps> = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/projects" component={ProjectPage} />
        <Route exact path="/user/projects" component={UserProjectsPage} />
        <Route
          exact
          path="/user/project/create"
          component={CreateProjectPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
