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
import FeatureImplDetailPage from "../pages/ProjectPage/FeaturePage/FeatureImplPage/FeatureImplDetailPage";

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
      <Route path="/auth" component={AuthRouter} />
      <Route
        exact
        path="/user/project/create"
        component={
          authStore.auth !== null
            ? ProjectFormPage
            : () => <Redirect to="/auth/login" />
        }
      />
      <Route
        exact
        path="/projects/:projectId/edit"
        component={
          authStore.auth !== null
            ? ProjectFormPage
            : () => <Redirect to="/auth/login" />
        }
      />
      <Route exact path="/projects/:projectId" component={authStore.auth !== null
          ?ProjectDetailPage: () => <Redirect to="/auth/login" />} />
      <Route
        exact
        path="/projects/:projectId/feature/add"
        component={
          authStore.auth !== null
            ? CreateFeaturePage
            : () => <Redirect to="/auth/login" />
        }
      />
      <Route
        exact
        path="/projects/:projectId/features/:featureId"
        component={ authStore.auth !== null
            ?FeaturePage: () => <Redirect to="/auth/login" />}
      />
      <Route
        exact
        path="/projects/:projectId/features/:featureId/implementation"
        component={
          authStore.auth !== null
            ? FeatureImplPage
            : () => <Redirect to="/auth/login" />
        }
      />
      <Route
        exact
        path="/projects/:projectId/features/:featureId/implementations/:implementationId"
        component={
          authStore.auth !== null
            ? FeatureImplDetailPage
            : () => <Redirect to="/auth/login" />
        }
    />
  <Route exact path="/user/:id" component={authStore.auth !== null
      ?ProfilePage : () => <Redirect to="/auth/login" />} />
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
