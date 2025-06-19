import React from "react";
import { Layout, Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
function Home() {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <>
      <Layout>
        <Header>
          <div className="container">
            <div>
              <h1 className="text-2xl font-bold">Zety</h1>

              <div>
                <div className="dropdown">
                  <Dropdown menu={{ items }}>
                    Tools <DownOutlined />
                  </Dropdown>
                </div>
                <Button>MY ACCOUNT</Button>
              </div>
            </div>
          </div>
        </Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default Home;
