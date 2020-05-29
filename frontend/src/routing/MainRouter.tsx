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

import AccountPage from "../pages/Account";
import CreateProjectPage from "../pages/CreateProjectPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import CreateFeaturePage from "../pages/CreateFeaturePage";
import FeatureImplPage from "../pages/ProjectPage/FeaturePage/FeatureImplPage";

interface IProps {}

const MainRouter: React.FC<IProps> = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/projects" component={ProjectPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />
        <Route
          exact
          path="/user/project/create"
          component={CreateProjectPage}
        />
        <Route
          exact
          path="/projects/:projectId/feature/add"
          component={CreateFeaturePage}
        />
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
        <Route
          exact
          path="/projects/:projectId/features/:featureId/impl"
          component={FeatureImplPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
