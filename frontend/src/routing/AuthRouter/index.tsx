import React from "react";
import {
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";

interface IProps extends RouteComponentProps {}

const AuthRouter: React.FC<IProps> = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path={`${props.match.path}/login`} component={LoginPage} />
        <Route
          exact
          path={`${props.match.path}/register`}
          component={RegisterPage}
        />
      </Switch>
    </Router>
  );
};

export default AuthRouter;
