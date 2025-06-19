import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Space, Row, Col, Menu } from "antd";
import { Button } from "antd";
import { useState } from "react";
const { Header, Content } = Layout;
const menuItems = [
  { key: "1", label: "Tools" },
  { key: "2", label: "Resume" },
  { key: "3", label: "CV" },
  { key: "4", label: "Cover Later" },
  { key: "5", label: "About" },
];
export default function CustomHeader() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header className="h-28  p-0 mx-44 px-4  flex items-center justify-between bg-white  ">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-800">zety</h1>
        </div>
        <div className="right-header flex justify-between gap-2 sm:hidden xl:flex">
          <nav className="flex space-x-6 px-6 text-gray-700 text-base font-medium ">
            <div className="flex items-center  cursor-pointer">
              <Space>
                <span>Tools</span>
                <DownOutlined size="small" />
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
        <div className="right-header sm:flex xl:hidden">
          <Button
            size="large"
            onClick={toggleMenu}
            className="text-2xl !text-gray-800 !border-gray-600  "
          >
            <MenuOutlined />
          </Button>
          <Menu></Menu>
        </div>
      </Header>
      <Content>
        <section className="flex justify-center">
          <Row className="">
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
                <Button size="large" className="content-btn">
                  MAKE YOUR RESUME NOW
                </Button>
              </div>
            </Col>
            <Col span={12}>
              <div className="px-4 image-part">
                <img
                  src="/src/assets/resume-builder-template@1x.png"
                  alt="/src/assets/imagepicture"
                  className="relative"
                />
              </div>
            </Col>
          </Row>
        </section>
      </Content>
    </>
  );
}
