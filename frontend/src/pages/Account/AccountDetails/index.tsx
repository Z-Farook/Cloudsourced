import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Row, Col, Card, Descriptions, PageHeader, Spin } from "antd";
import IRemoteData, {
  fromLoading,
  fromLoaded,
  EState,
} from "../../../core/IRemoteData";
import { User, UserResourceApi } from "cloudsourced-api";
import { api } from "../../../core/api";
import { formatUser } from "../../../formatters/user";
import noImage from "../../../assets/noimage.png";
interface IProps extends RouteComponentProps {}

const AccountDetails: React.FC<IProps> = (props) => {
  const [user, setUser] = useState<IRemoteData<User, null>>(fromLoading());

  useEffect(() => {
    (async () => {
      const result = await new UserResourceApi(
        api.config
      ).getUserInfoUsingGET();
      setUser(fromLoaded(result));
    })();
  }, []);
  return (
    <>
      {user.state === EState.Loading ? (
        <Spin />
      ) : (
        <>
          <Row justify="center" gutter={[24, 24]}>
            <Col span={24}>
              <Card>
                <PageHeader
                  className="site-page-header"
                  title="Personal details"
                />
                <Row>
                  <Col span={4}>
                    <img alt={user.data!.name!} className="detailImage" src={user.data!.image ? user.data!.image : noImage} />
                  </Col>
                  <Col span={20}>
                    <Descriptions title={formatUser(user.data!)}>
                      <Descriptions.Item span={3} label="Name">
                        {user.data!.name!}
                      </Descriptions.Item>
                      <Descriptions.Item span={3} label="Infix">
                        {user.data!.infix!}
                      </Descriptions.Item>
                      <Descriptions.Item span={3} label="Lastname">
                        {user.data!.lastName!}
                      </Descriptions.Item>
                      <Descriptions.Item span={3} label="Country">
                        {user.data!.country!}
                      </Descriptions.Item>
                      <Descriptions.Item  label="Street">
                        {user.data!.street!}
                      </Descriptions.Item>
                      <Descriptions.Item label="Streetnumber">
                        {user.data!.streetNumber!}
                      </Descriptions.Item>
                      <Descriptions.Item  label="Telephone">
                        {user.data!.telephone!}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row justify="center" gutter={[24, 24]}>
            <Col span={24}>
              <Card>
                <PageHeader
                  className="site-page-header"
                  title="Account settings"
                />
                <Row>
                  <Col span={4}></Col>
                  <Col span={16}>
                    <Descriptions>
                      <Descriptions.Item span={3} label="Email">
                        {user.data?.email}
                      </Descriptions.Item>
                      <Descriptions.Item span={3} label="Password">
                        ******
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default withRouter(AccountDetails);
