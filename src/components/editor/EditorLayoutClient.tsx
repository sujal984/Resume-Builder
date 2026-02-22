"use client";

import { ReactNode, useState } from "react";
import { Button, Tooltip, message, Drawer } from "antd";
import {
  DownloadOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

interface EditorLayoutClientProps {
    Sidebar: ReactNode;
    Canvas: ReactNode;
    Preview: ReactNode;
    AIPanel: ReactNode;
}

export default function EditorLayoutClient({ Sidebar, Canvas, Preview, AIPanel }: EditorLayoutClientProps) {
    const [showAIPanel, setShowAIPanel] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const params = useParams();
    const resumeId = params.resumeId as string;

    const handleDownload = async () => {
        setDownloading(true);
        try {
            window.open(`/api/resumes/${resumeId}/pdf`, '_blank');
            message.success("PDF download started!");
        } catch (error) {
            message.error("Failed to download PDF");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Left Sidebar - Content */}
            <div className="w-80 border-r bg-white flex-shrink-0 h-full overflow-hidden shadow-sm">
                {Sidebar}
            </div>

            {/* Main Content Area - Full Width */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Top Toolbar */}
                <div className="h-16 border-b bg-white px-6 flex items-center justify-between shadow-sm z-10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                            R
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Resume Editor</h2>
                            <p className="text-xs text-gray-500">Auto-saved just now</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tooltip title={showAIPanel ? "Hide AI Insights" : "Show AI Insights"}>
                        <Button
                          type={showAIPanel ? "primary" : "default"}
                          icon={showAIPanel ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                          onClick={() => setShowAIPanel(!showAIPanel)}
                          size="large"
                          className={showAIPanel ? "bg-violet-600 hover:bg-violet-700" : ""}
                        >
                          AI Insights
                        </Button>
                      </Tooltip>
                      <Tooltip title="Preview Resume">
                        <Button
                          type="default"
                          icon={<EyeOutlined />}
                          onClick={() => setShowPreview(true)}
                          size="large"
                          className="border-indigo-400 text-indigo-600 hover:border-indigo-600 hover:text-indigo-700"
                        >
                          Preview
                        </Button>
                      </Tooltip>
                      <Tooltip title="Download PDF">
                        <Button
                          type="primary"
                          icon={<DownloadOutlined />}
                          onClick={handleDownload}
                          loading={downloading}
                          size="large"
                          className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none hover:from-violet-700 hover:to-indigo-700 shadow-lg"
                        >
                          Download PDF
                        </Button>
                      </Tooltip>
                    </div>
                </div>

                {/* Canvas Content */}
                <div className="flex-1 overflow-hidden">
                    {Canvas}
                </div>
            </div>

            {/* Right Sidebar - AI Suggestions (Collapsible) */}
            <AnimatePresence>
              {showAIPanel && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 360, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-l bg-white flex-shrink-0 h-full overflow-hidden shadow-lg relative"
                >
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => setShowAIPanel(false)}
                    className="absolute top-2 right-2 z-10"
                  />
                  {AIPanel}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Preview Drawer - Full Screen */}
            <Drawer
              title={
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Resume Preview</span>
                </div>
              }
              placement="right"
              width="100%"
              open={showPreview}
              onClose={() => setShowPreview(false)}
              styles={{
                body: { padding: 0, background: "#f5f5f5" }
              }}
            >
              <div className="h-full overflow-auto p-8 flex items-center justify-center">
                {Preview}
              </div>
            </Drawer>
        </div>
    );
}
