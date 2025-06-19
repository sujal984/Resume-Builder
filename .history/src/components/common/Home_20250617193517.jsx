import { DownOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Button } from "antd";

const { Header } = Layout;

export default function CustomHeader() {
  return (
    <Header className="h-28  p-0 mx-44 px-4  flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        {/* <img src="/logo.svg" alt="Logo" className="w-6 h-6" /> */}
        <h1 className="text-2xl font-bold-500 text-gray-800">zety</h1>
      </div>
      <div className="right-header flex justify-between gap-2 after:">
        <nav className="flex space-x-6 px-6 text-gray-700 text-base font-medium">
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>Tools</span>
            <DownOutlined />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>Resume</span>
            <DownOutlined />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>CV</span>
            <DownOutlined />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>Cover Letter</span>
            <DownOutlined />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>About</span>
            <DownOutlined />
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
  );
}
