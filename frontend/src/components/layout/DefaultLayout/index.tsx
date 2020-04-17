import React from "react";
import Header from "../Header";
import Footer from "../Footer";

interface IProps {}

const DefaultLayout: React.FC<IProps> = (props) => {
  return (
    <>
      <Header/>
      <section>
        {props.children}
      </section>
      <Footer/>
    </>
  );
};

export default DefaultLayout;
