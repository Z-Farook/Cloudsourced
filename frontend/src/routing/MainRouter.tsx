import React from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import LandingPage from "../pages/LandingPage";

interface IProps {}

const MainRouter: React.FC<IProps> = (props) => {
  return (
    <Router>
      <Route path="/" exact component={LandingPage} />
    </Router>
  );
};

export default MainRouter;
