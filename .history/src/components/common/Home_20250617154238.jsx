import React from "react";
import { Layout, Button, Dropdown } from "antd";
const { Header, Content, Footer } = Layout;
function Home() {
  return (
    <>
      <Layout>
        <Header>
          <div className="container">
            <div>
              <h1 className="text-2xl font-bold">Zety</h1>

              <div>
                <div className="dropdown">
                  <Dropdown></Dropdown>
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
