import { DownOutlined } from "@ant-design/icons";
import { Layout, Space ,Row,Col} from "antd";
import { Button } from "antd";

const { Header, Content } = Layout;

export default function CustomHeader() {
  return (
    <>
      <Header className="h-28  p-0 mx-44 px-4  flex items-center justify-between bg-white shadow-sm">
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
        <section className="container">
          <Row>
            <Col span={12} offset={6}>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Find the right <span className="text-blue-600">resume</span> for
                  your job
                </h1>
                <p className="text-gray-600 mb-8">
                  Create a resume that stands out and get the job you want.
                </p>
                <Button
                  type="primary"
                  size="large"
                  className="rounded-full  font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
          </Row>
           
        </section>
      </Content>
    </>
  );
}
