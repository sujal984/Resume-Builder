import React from "react";
import { Layout, Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
function Home() {
  return (
    <>
      <Layout>
        <Header>
          <div className="flex justify-between  mx-20 ">
            <h1 className="text-2xl font-bold">Zety</h1>

            <div className="flex gap-2">
              <div className="dropdown flex gap-2">
                Tools <DownOutlined />
                Tools <DownOutlined />
                Tools <DownOutlined />
                Tools <DownOutlined />
                Tools <DownOutlined />
              </div>
              <Button>MY ACCOUNT</Button>
            </div>
          </div>
        </Header>
      </Layout>
    </>
  );
}

export default Home;
