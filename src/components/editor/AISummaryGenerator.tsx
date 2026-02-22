"use client";

import { useState } from "react";
import { Modal, Input, Button, Space, Spin, message, Form } from "antd";
import {
  ThunderboltOutlined,
  CheckOutlined,
  CopyOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const { TextArea } = Input;

interface AISummaryGeneratorProps {
  open: boolean;
  onClose: () => void;
  onApply: (summary: string) => void;
}

export default function AISummaryGenerator({
  open,
  onClose,
  onApply,
}: AISummaryGeneratorProps) {
  const [form] = Form.useForm();
  const [generatedSummary, setGeneratedSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: values.jobTitle,
          experience: values.experience,
          skills: values.skills,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate summary");

      const data = await response.json();
      setGeneratedSummary(data.summary);
      message.success("Summary generated successfully!");
    } catch (error) {
      message.error("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedSummary) {
      onApply(generatedSummary);
      message.success("Summary applied to your resume!");
      handleClose();
    }
  };

  const handleCopy = () => {
    if (generatedSummary) {
      navigator.clipboard.writeText(generatedSummary);
      message.success("Copied to clipboard!");
    }
  };

  const handleClose = () => {
    form.resetFields();
    setGeneratedSummary("");
    onClose();
  };

  return (
    <Modal
      title={
        <Space>
          <ThunderboltOutlined className="text-violet-600" />
          <span>AI Professional Summary Generator</span>
        </Space>
      }
      open={open}
      onCancel={handleClose}
      width={700}
      footer={null}
      destroyOnClose
    >
      <div className="space-y-4 py-4">
        <Form form={form} layout="vertical" onFinish={handleGenerate}>
          {/* Job Title */}
          <Form.Item
            name="jobTitle"
            label="Job Title / Target Position"
            rules={[{ required: true, message: "Please enter your job title" }]}
          >
            <Input
              size="large"
              placeholder="e.g., Senior Software Engineer"
            />
          </Form.Item>

          {/* Years of Experience */}
          <Form.Item
            name="experience"
            label="Years of Experience (Optional)"
          >
            <Input
              size="large"
              placeholder="e.g., 5+ years"
            />
          </Form.Item>

          {/* Key Skills */}
          <Form.Item
            name="skills"
            label="Key Skills (Optional)"
          >
            <TextArea
              rows={3}
              placeholder="e.g., React, Node.js, AWS, Team Leadership, Agile"
            />
          </Form.Item>

          {/* Generate Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<ThunderboltOutlined />}
              loading={loading}
              block
              size="large"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none hover:from-violet-700 hover:to-indigo-700"
            >
              {loading ? "Generating..." : "Generate Summary with AI"}
            </Button>
          </Form.Item>
        </Form>

        {/* Generated Summary Display */}
        <AnimatePresence>
          {generatedSummary && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg p-4 border border-violet-200">
                <div className="flex items-start justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Generated Professional Summary
                  </label>
                  <Space>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={handleCopy}
                    >
                      Copy
                    </Button>
                    <Button
                      type="text"
                      size="small"
                      icon={<ReloadOutlined />}
                      onClick={() => form.submit()}
                    >
                      Regenerate
                    </Button>
                  </Space>
                </div>
                <p className="text-gray-800 leading-relaxed text-base">
                  {generatedSummary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleApply}
                  size="large"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Apply to Resume
                </Button>
                <Button size="large" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Space direction="vertical" align="center">
              <Spin size="large" />
              <p className="text-sm text-gray-600">
                AI is crafting your professional summary...
              </p>
            </Space>
          </div>
        )}

        {/* Tips */}
        {!generatedSummary && !loading && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-2">💡 Tips for Best Results:</p>
            <ul className="text-xs text-blue-700 space-y-1 ml-4">
              <li>• Be specific about your job title or target position</li>
              <li>• Mention your years of experience for better context</li>
              <li>• List your most relevant technical and soft skills</li>
              <li>• The AI will create a compelling 3-4 sentence summary</li>
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
}
