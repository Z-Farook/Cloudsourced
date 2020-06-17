import React from "react";
import {
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";
import AuthStore from "../../stores/AuthStore";
import AccountPage from "../../pages/Account";
import home from "../../pages/HomePage";
interface IProps extends RouteComponentProps {}

const AuthRouter: React.FC<IProps> = (props) => {
  const authStore = AuthStore.useContainer();
  return (
    <Router>
      <Switch>
        <Route exact path={`${props.match.path}/login`} component={LoginPage} />
        <Route
          exact
          path={`${props.match.path}/register`}
          component={RegisterPage}
        />
        <Route
          exact
          path="/account"
          component={
            authStore.auth !== null
              ? AccountPage
              : () => <Redirect to="/home" />
          }
        />
        <Route exact path="/home" component={home} />
      </Switch>
    </Router>
  );
};

export default AuthRouter;
