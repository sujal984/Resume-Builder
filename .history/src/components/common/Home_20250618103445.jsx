import { DownOutlined } from "@ant-design/icons";
import { Layout, Space, Row, Col } from "antd";
import { Button } from "antd";

const { Header, Content } = Layout;

export default function CustomHeader() {
  return (
    <>
      <Header className="h-28  p-0 mx-44 px-4  flex items-center justify-between bg-white shadow-sm ">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-800">zety</h1>
        </div>
        <div className="right-header flex justify-between gap-2 after:">
          <nav className="flex space-x-6 px-6 text-gray-700 text-base font-medium">
            <div className="flex items-center  cursor-pointer">
              <Space>
                <span>Tools</span>
                <DownOutlined />
              </Space>
            </div>
            <div className="flex items-center  cursor-pointer">
              <Space>
                <span>Resume</span>
                <DownOutlined />
              </Space>
            </div>
            <div className="flex items-center  cursor-pointer">
              <Space>
                <span>CV</span>
                <DownOutlined />
              </Space>
            </div>
            <div className="flex items-center cursor-pointer">
              <Space>
                <span>Cover Letter</span>
                <DownOutlined />
              </Space>
            </div>
            <div className="flex items-center  cursor-pointer">
              <Space>
                <span>About</span>
                <DownOutlined />
              </Space>
            </div>
          </nav>

          <Button
            type="primary"
            size="large"
            className="rounded-full  font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
            style={{
              padding: "15px 25px 13px",
            }}
          >
            MY ACCOUNT
          </Button>
        </div>
      </Header>
      <Content>
        <section className="container flex justify-center  fst-page">
          <Row className="w-fit    ">
            <Col span={12} className="">
              <div
                style={{ margin: "60px 0px" }}
                className=" px-4 w-fit  justify-center align-middle "
              >
                <h1
                  style={{
                    fontSize: "44px",
                    lineHeight: "55px",
                    width: "553px",
                  }}
                  className=" font-bold-500 w-fit"
                >
                  Best Online Resume Builder (Free to Try)
                </h1>
                <p style={{ fontSize: "22px" }}>Fast. Easy. Effective.</p>

                <p className="fst-para">
                  Writing a resume is a daunting task. Nothing but stress,
                  confusion, and wasting precious hours on making an attractive
                  template. But not with Zety. Let us take over.
                </p>
                <Button type="" size="large" className=" content-btn   ">
                  GET STARTED
                </Button>
              </div>
            </Col>
            <Col span={12}>
              <div className="px-4 image-part">
                <img
                  src="/src/assets/resume-builder-template@1x.png"
                  alt="/src/assets/imagepicture"
                />
              </div>
            </Col>
          </Row>
        </section>
      </Content>
    </>
  );
}
