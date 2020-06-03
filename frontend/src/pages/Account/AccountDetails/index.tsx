import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Row, Col, Card, Descriptions, PageHeader } from "antd";


interface IProps extends RouteComponentProps {}

const AccountDetails: React.FC<IProps> = (props) => {
  return (
    <>
      <Row justify="center" gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <PageHeader
              className="site-page-header"
              title="Personal details"
              //   extra={[
              //     <Button
              //       type="primary"
              //       onClick={() => props.history.push("/user/project/create")}
              //       icon={<EditOutlined />}
              //     >
              //       Edit
              //     </Button>,
              //   ]}
            />
            <Row>
              <Col span={4}></Col>
              <Col span={16}>
                <Descriptions title="Joris van der Sluis">
                  <Descriptions.Item span={16} label="UserName">
                    Zhou Maomao
                  </Descriptions.Item>
                  <Descriptions.Item span={16} label="Telephone">
                    1810000000
                  </Descriptions.Item>
                  <Descriptions.Item span={16} label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                  <Descriptions.Item label="Remark">empty</Descriptions.Item>
                  <Descriptions.Item label="Address">
                    No. 18, Wantang Road,
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
              //   extra={[
              //     <Button
              //       type="primary"
              //       onClick={() => props.history.push("/user/project/create")}
              //       icon={<EditOutlined />}
              //     >
              //       Edit
              //     </Button>,
              //   ]}
            />
            <Row>
              <Col span={4}></Col>
              <Col span={16}>
                <Descriptions>
                  <Descriptions.Item span={16} label="Email">
                    Zhou@email.com
                  </Descriptions.Item>
                  <Descriptions.Item span={16} label="Password">
                    ******
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(AccountDetails);
