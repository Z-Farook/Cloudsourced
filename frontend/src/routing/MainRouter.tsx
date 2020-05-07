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
import ProjectPage from "../pages/ProjectPage";
import FeaturePage from "../pages/ProjectPage/FeaturePage";

interface IProps {}

const MainRouter: React.FC<IProps> = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/projects" component={ProjectPage} />
        <Route
          exact
          path="/projects/:projectId"
          component={ProjectDetailPage}
        />
        <Route
          exact
          path="/projects/:projectId/features/:featureId"
          component={FeaturePage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
