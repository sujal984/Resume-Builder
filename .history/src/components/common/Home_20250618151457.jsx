// import { DownOutlined, MenuOutlined } from "@ant-design/icons";
// import { Layout, Space, Row, Col, Drawer } from "antd";
// import { Button } from "antd";
// import { useState } from "react";
// const { Header, Content } = Layout;

// export default function CustomHeader() {
//   const [open, setOpen] = useState(false);
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//       <Header className=" h-24 p-0 xl:mx-44 px-4 container !w-full flex items-center justify-between bg-white  xs:mx-0 ">
//         <div className="flex items-center space-x-2">
//           <div className="w-full">
//             <h1 className="text-2xl font-bold text-gray-800 break-words "></h1>
//           </div>
//           zety
//         </div>
//         <div className="right-header flex justify-between gap-2 xs:hidden xl:flex">
//           <nav className="flex space-x-6 px-6 text-gray-700 text-base font-medium ">
//             <div className="flex items-center  cursor-pointer">
//               <Space>
//                 <span>Tools</span>
//                 <DownOutlined size="small" />
//               </Space>
//             </div>
//             <div className="flex items-center  cursor-pointer">
//               <Space>
//                 <span>Resume</span>
//                 <DownOutlined />
//               </Space>
//             </div>
//             <div className="flex items-center  cursor-pointer">
//               <Space>
//                 <span>CV</span>
//                 <DownOutlined />
//               </Space>
//             </div>
//             <div className="flex items-center cursor-pointer">
//               <Space>
//                 <span>Cover Letter</span>
//                 <DownOutlined />
//               </Space>
//             </div>
//             <div className="flex items-center  cursor-pointer">
//               <Space>
//                 <span>About</span>
//                 <DownOutlined />
//               </Space>
//             </div>
//           </nav>

//           <Button
//             type="primary"
//             size="large"
//             className="rounded-full  font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
//             style={{
//               padding: "15px 25px 13px",
//             }}
//           >
//             MY ACCOUNT
//           </Button>
//         </div>
//         <div className="right-header xs:flex xl:hidden">
//           <Button
//             size="large"
//             onClick={showDrawer}
//             className="text-2xl !text-gray-800 !border-gray-600  "
//           >
//             <MenuOutlined />
//           </Button>
//           <Drawer
//             title="Menu"
//             closable={{ "aria-label": "Close Button" }}
//             onClose={onClose}
//             open={open}
//           >
//             <Space direction="vertical">
//               <h3>Tools</h3>
//               <h3>Resume</h3>
//               <h3>CV</h3>
//               <h3>Cover Later</h3>
//               <h3>About</h3>
//             </Space>
//           </Drawer>
//         </div>
//       </Header>
//       <Content className="container flex justify-center">
//         <section className="">
//           <Row>
//             <Col xs={{ span: 24 }} lg={{ span: 12 }} className="">
//               <div
//                 style={{ margin: "60px 0px" }}
//                 className=" px-4 !xs:w-full xl:w-fit  justify-center align-middle xs:!my-0 "
//               >
//                 <h1
//                   style={{
//                     fontSize: "44px",
//                     lineHeight: "55px",
//                     width: "553px",
//                   }}
//                   className=" font-bold-500 w-fit"
//                 >
//                   Best Online Resume Builder (Free to Try)
//                 </h1>
//                 <p style={{ fontSize: "22px" }}>Fast. Easy. Effective.</p>

//                 <p className="fst-para xs:!w-full xl:!w-[553px] break-words">
//                   Writing a resume is a daunting task. Nothing but stress,
//                   confusion, and wasting precious hours on making an attractive
//                   template. But not with Zety. Let us take over.
//                 </p>
//                 <Button size="large" className="content-btn">
//                   MAKE YOUR RESUME NOW
//                 </Button>
//               </div>
//             </Col>
//             <Col xs={{ span: 24 }} lg={{ span: 12 }}>
//               <div className="lg:px-4  image-part xs:!w-full ">
//                 <img
//                   src="/src/assets/resume-builder-template@1x.png"
//                   alt="/src/assets/imagepicture"
//                   className="relative xs:justify-self-center fst-page-img z-10"
//                 />
//               </div>
//             </Col>
//           </Row>
//         </section>
//       </Content>
//     </>
//   );
// }

import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Space, Row, Col, Drawer, Button, Typography } from "antd";
import { useState } from "react";
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

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
      <Header className="h-20 p-0 xl:px-44 px-4 !w-full flex items-center justify-between bg-white xs:mx-0 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-blue-600 break-words">
              zety
            </h1>
          </div>
        </div>
        <div className="right-header flex justify-between gap-2 xs:hidden xl:flex">
          <nav className="flex space-x-6 px-6 text-gray-700 text-base font-medium">
            <div className="flex items-center cursor-pointer hover:text-blue-600">
              <Space>
                <span>Tools</span>
                <DownOutlined size="small" />
              </Space>
            </div>
            <div className="flex items-center cursor-pointer hover:text-blue-600">
              <Space>
                <span>Resume</span>
                <DownOutlined />
              </Space>
            </div>
            <div className="flex items-center cursor-pointer hover:text-blue-600">
              <Space>
                <span>CV</span>
                <DownOutlined />
              </Space>
            </div>
            <div className="flex items-center cursor-pointer hover:text-blue-600">
              <Space>
                <span>Cover Letter</span>
                <DownOutlined />
              </Space>
            </div>
            <div className="flex items-center cursor-pointer hover:text-blue-600">
              <Space>
                <span>About</span>
                <DownOutlined />
              </Space>
            </div>
          </nav>

          <Button
            type="primary"
            size="large"
            className="rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700"
            style={{
              padding: "0 25px",
              height: "40px",
            }}
          >
            MY ACCOUNT
          </Button>
        </div>
        <div className="right-header xs:flex xl:hidden">
          <Button
            size="large"
            onClick={showDrawer}
            className="text-2xl !text-gray-800 !border-none !shadow-none"
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
              <h3>Tools</h3>
              <h3>Resume</h3>
              <h3>CV</h3>
              <h3>Cover Letter</h3>
              <h3>About</h3>
            </Space>
          </Drawer>
        </div>
      </Header>
      <Content className="container flex justify-center">
        <section className="max-w-7xl w-full">
          <Row className="items-center">
            <Col xs={{ span: 24 }} lg={{ span: 12 }} className="py-8">
              <div className="px-4 xs:!w-full xl:w-fit">
                <Title
                  level={1}
                  className="!text-[44px] !leading-[55px] !mb-4 !font-bold"
                >
                  Best Online Resume Builder (Free to Try)
                </Title>
                <Paragraph className="!text-[22px] !text-gray-700 !mb-6">
                  Fast. Easy. Effective.
                </Paragraph>

                <Paragraph className="!text-lg !text-gray-700 !mb-8 xs:!w-full xl:!w-[553px]">
                  Writing a resume is a daunting task. Nothing but stress,
                  confusion, and wasting precious hours on making an attractive
                  template. But not with Zety. Let us take over.
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  className="!h-14 !text-lg !font-semibold !bg-blue-600 hover:!bg-blue-700"
                  style={{
                    padding: "0 30px",
                  }}
                >
                  MAKE YOUR RESUME NOW
                </Button>
              </div>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <div className="lg:px-4 xs:!w-full flex justify-center">
                <img
                  src="/src/assets/resume-builder-template@1x.png"
                  alt="Resume template"
                  className="max-w-full h-auto"
                />
              </div>
            </Col>
          </Row>
        </section>
      </Content>
    </>
  );
}
