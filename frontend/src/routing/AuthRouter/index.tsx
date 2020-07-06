import React from "react";
import {
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import {Route} from "react-router-dom";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";
import home from "../../pages/HomePage";
import MainRouter from "../MainRouter";
import ProjectPage from "../../pages/ProjectPage";
import AuthStore from "../../stores/AuthStore";

interface IProps extends RouteComponentProps {
}

const AuthRouter: React.FC<IProps> = (props) => {
  // const authStore = AuthStore.useContainer();
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={`${props.match.path}/login`}
          component={
            LoginPage
          }
        />
        <Route
          exact
          path={`${props.match.path}/register`}
          component={
            RegisterPage
          }
        />
        <Route exact path="/account" component={MainRouter}/>
        <Route exact path="/home" component={home}/>
        <Route exact path="/projects" component={ProjectPage}/>
      </Switch>
    </Router>
  );
};

export default AuthRouter;
