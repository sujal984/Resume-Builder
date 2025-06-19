import React from "react";
import { Layout, Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
function Home() {
  return (
    <>
      <Layout>
        <Header>
          <div className="container">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Zety</h1>

              <div>
                <div className="dropdown">
                  Tools <DownOutlined />
                  Tools <DownOutlined />
                  Tools <DownOutlined />
                  Tools <DownOutlined />
                  Tools <DownOutlined />
                </div>
                <Button>MY ACCOUNT</Button>
              </div>
            </div>
          </div>
        </Header>
      </Layout>
    </>
  );
}

export default Home;
