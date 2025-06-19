import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Space, Row, Col, Drawer } from "antd";
import { Button } from "antd";
import { useState } from "react";
const { Header, Content } = Layout;

export default function CustomHeader() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* {Header part start} */}
      <Header className="container-fluid p-0  grid">
        <div className="flex items-center justify-between  px-4 mx-40 ">
          <h1 className="text-2xl font-bold text-gray-800 break-words ">
            zety
          </h1>

          <div className="right-header flex justify-between gap-2 xs:hidden xl:flex">
            <nav className="flex space-x-6 px-6 text-gray-700 text-base font-medium ">
              {["Tools", "Resume", "CV", "Cover Letter", "About"].map(
                (item) => (
                  <div key={item} className="cursor-pointer flex items-center">
                    <Space>
                      <span>{item}</span>
                      <DownOutlined />
                    </Space>
                  </div>
                )
              )}
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

          <div className="right-header xs:flex xl:hidden">
            <Button
              size="large"
              onClick={showDrawer}
              className="text-2xl !text-gray-800 !border-gray-600  "
            >
              <MenuOutlined />
            </Button>
            <Drawer
              title="Menu"
              closable={{ "aria-label": "Close Button" }}
              onClose={onClose}
              open={open}
            >
              <Space direction="vertical">
                {["Tools", "Resume", "CV", "Cover Letter", "About"].map(
                  (item) => (
                    <h3 key={item}>{item}</h3>
                  )
                )}
              </Space>
            </Drawer>
          </div>
        </div>
      </Header>
      {/* {Header part ends} */}

      {/* {Content part First page start} */}
      <Content>
        <section className="container-fluid ">
          <Row className="flex">
            <Col xs={{ span: 24 }} lg={{ span: 12 }} className="">
              <div
                style={{ margin: "60px 0px" }}
                className=" px-4 !xs:w-full xl:w-fit  justify-center align-middle xs:!my-0 "
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

                <p className="fst-para xs:!w-full xl:!w-[553px] break-words">
                  Writing a resume is a daunting task. Nothing but stress,
                  confusion, and wasting precious hours on making an attractive
                  template. But not with Zety. Let us take over.
                </p>
                <Button size="large" className="content-btn">
                  MAKE YOUR RESUME NOW
                </Button>
              </div>
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <div className="lg:px-4  image-part xs:!w-full ">
                <img
                  src="/src/assets/resume-builder-template@1x.png"
                  alt="/src/assets/imagepicture"
                  className="relative xs:justify-self-center fst-page-img z-10"
                />
              </div>
            </Col>
          </Row>
        </section>
      </Content>
    </>
  );
}
