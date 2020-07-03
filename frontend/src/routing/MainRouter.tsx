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
import ProfilePage from "../pages/ProfilePage";
import AccountPage from "../pages/Account";
import ProjectFormPage from "../pages/ProjectFormPage";
import CreateFeaturePage from "../pages/CreateFeaturePage";
import FeatureImplPage from "../pages/ProjectPage/FeaturePage/FeatureImplPage";
import AuthRouter from "./AuthRouter";
import AuthStore from "../stores/AuthStore";

interface IProps {}
export const MainSwitch = () => {
  const authStore = AuthStore.useContainer();
  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/home" />} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/projects" component={ProjectPage} />
      <Route
        exact
        path="/account"
        component={
          authStore.auth !== null ? AccountPage : () => <Redirect to="/home" />
        }
      />
      <Route
        path="/auth"
        component={
          authStore.auth === null ? AuthRouter : () => <Redirect to="/home" />
        }
      />
      <Route
        exact
        path="/user/project/create"
        component={
          ProjectFormPage
          // authStore.auth !== null
          //   ? ProjectFormPage
          //   : () => <Redirect to="/auth/login" />
        }
      />
      <Route
        exact
        path="/projects/:projectId/edit"
        component={
          ProjectFormPage
          // authStore.auth !== null
          //   ? ProjectFormPage
          //   : () => <Redirect to="/auth/login" />
        }
      />
      <Route exact path="/projects/:projectId" component={ProjectDetailPage} />
      <Route
        exact
        path="/projects/:projectId/feature/add"
        component={
          CreateFeaturePage
          // authStore.auth !== null
          //   ? CreateFeaturePage
          //   : () => <Redirect to="/auth/login" />
        }
      />
      <Route
        exact
        path="/projects/:projectId/features/:featureId"
        component={FeaturePage}
      />
      <Route
        exact
        path="/projects/:projectId/features/:featureId/implementation"
        component={
          FeatureImplPage
          // authStore.auth !== null
          //   ? FeatureImplPage
          //   : () => <Redirect to="/auth/login" />
        }
      />
      <Route exact path="/user/:id" component={ProfilePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};
const MainRouter: React.FC<IProps> = (props) => {
  return (
    <Router>
      <MainSwitch />
    </Router>
  );
};

export default MainRouter;
