import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Button } from "antd";
import homeImage from "../../assets/home.jpg";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
interface IProps extends RouteComponentProps {}

const HomePage: React.FC<IProps> = (props) => {
  return (
    <DefaultLayout>
      <Title style={{ marginTop: "3em", textAlign: "center" }}>
        In need of software components?
      </Title>
      <Text style={{ textAlign: "center" }}>
        Look no further, we offer a great network of developers to help you!
        <br />
        Now you probably think where is the catch? Well there is none, our
        services are free to use.
      </Text>

      <img
        src={homeImage}
        alt={""}
        style={{ marginLeft: "27%", width: "50%" }}
      />

      <Button
        type="primary"
        shape="round"
        style={{ marginLeft: "auto", marginRight: "auto", width: "12em" }}
        onClick={() => {
          props.history.push(`/auth/register`);
        }}
      >
        Sign Up
      </Button>
    </DefaultLayout>
  );
};

export default HomePage;
