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
            <Col span={12} className="my-15">
              <h1 className="text-5xl font-bold-500 w-98">
                Best Online Resume Builder (Free to Try)
              </h1>
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
