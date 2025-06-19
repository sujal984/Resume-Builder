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
import { Layout, Space, Row, Col, Drawer, Button } from "antd";
import { useState } from "react";
const { Header, Content } = Layout;

export default function CustomHeader() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <Layout className="bg-white">
      {/* Header Section */}
      <Header className="bg-white shadow-sm px-4 xl:px-44 flex items-center justify-between h-20 sticky top-0 z-50">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-700">zety</div>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-6 text-gray-700 font-medium">
          {["Tools", "Resume", "CV", "Cover Letter", "About"].map((item) => (
            <div key={item} className="cursor-pointer flex items-center">
              <Space>
                <span>{item}</span>
                <DownOutlined />
              </Space>
            </div>
          ))}
          <Button
            type="primary"
            size="large"
            className="rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 font-semibold"
            style={{ padding: "14px 24px" }}
          >
            MY ACCOUNT
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <Button
            icon={<MenuOutlined />}
            size="large"
            onClick={showDrawer}
            className="!border-none !text-gray-800"
          />
          <Drawer title="Menu" onClose={onClose} open={open}>
            <Space direction="vertical" className="text-lg">
              {["Tools", "Resume", "CV", "Cover Letter", "About"].map(
                (item) => (
                  <span key={item}>{item}</span>
                )
              )}
            </Space>
          </Drawer>
        </div>
      </Header>

      {/* Hero Section */}
      <Content className="bg-white px-4 xl:px-44 py-16">
        <Row gutter={[24, 24]} align="middle">
          {/* Left Text */}
          <Col xs={24} lg={12}>
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Best Online Resume Builder (Free to Try)
              </h1>
              <p className="text-xl text-gray-700 mb-3">
                Fast. Easy. Effective.
              </p>
              <p className="text-base text-gray-600 mb-6">
                Writing a resume is a daunting task. Nothing but stress,
                confusion, and wasting precious hours on making an attractive
                template. But not with Zety. Let us take over.
              </p>
              <Button
                type="primary"
                size="large"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full"
              >
                MAKE YOUR RESUME NOW
              </Button>
            </div>
          </Col>

          {/* Right Image */}
          <Col xs={24} lg={12} className="text-center">
            <img
              src="/src/assets/resume-builder-template@1x.png"
              alt="Resume Template"
              className="max-w-full w-[90%] mx-auto"
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
