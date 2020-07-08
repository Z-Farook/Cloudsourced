import React from "react";
import { RouteComponentProps } from "react-router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Button } from "antd";
import homeImage from "../../assets/home.jpg";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import AuthStore from "../../stores/AuthStore";
interface IProps extends RouteComponentProps {}

const HomePage: React.FC<IProps> = (props) => {
  const authStore = AuthStore.useContainer();
  return (
    <DefaultLayout>
        <div style={{display: "flex", flexDirection:"row"}}>
        <div style={{marginLeft: "200px",}}>
      <Title style={{ marginTop: "3em",  fontSize:"60px", fontWeight:700 }}>
      Redistribute to <br/>Expand.

      </Title>
      <Text style={{   fontSize:"20px", fontWeight:400 }}>
       Build innovative software components, tests and
          <br/>projects with a great and vast network of
        <br />
         motivated software developers.


      </Text>
            <br/>
            {authStore.auth !== null ? (
                <Button
                    type="primary"
                    shape="round"
                    style={{  marginTop:"50px", width: "12em" }}
                    onClick={() => {
                        props.history.push(`/account`);
                    }}
                >
                    Start
                </Button>
            ) : (
                <Button
                    type="primary"
                    shape="round"
                    style={{ marginTop:"50px", width: "12em" }}
                    onClick={() => {
                        props.history.push(`/auth/register`);
                    }}
                >
                    Sign Up
                </Button>
            )}
        </div>
      <img
        src={homeImage}
        alt={""}
        style={{ marginLeft: "200px", marginTop:"150px", width: "50%" }}
      />
        </div>

    </DefaultLayout>
  );
};

export default HomePage;
