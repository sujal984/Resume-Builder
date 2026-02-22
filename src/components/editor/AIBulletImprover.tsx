"use client";

import { useState } from "react";
import { Modal, Input, Button, Space, Radio, message, Spin } from "antd";
import {
  ThunderboltOutlined,
  CheckOutlined,
  CopyOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const { TextArea } = Input;

type AIAction = "improve" | "grammar" | "ats" | "impactful";

interface AIBulletImproverProps {
  open: boolean;
  onClose: () => void;
  initialText?: string;
  onApply: (improvedText: string) => void;
}

export default function AIBulletImprover({
  open,
  onClose,
  initialText = "",
  onApply,
}: AIBulletImproverProps) {
  const [originalText, setOriginalText] = useState(initialText);
  const [improvedText, setImprovedText] = useState("");
  const [action, setAction] = useState<AIAction>("improve");
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    if (!originalText.trim()) {
      message.warning("Please enter some text to improve");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/ai/improve-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: originalText,
          action,
        }),
      });

      if (!response.ok) throw new Error("Failed to improve text");

      const data = await response.json();
      setImprovedText(data.improved);
      message.success("Text improved successfully!");
    } catch (error) {
      message.error("Failed to improve text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (improvedText) {
      onApply(improvedText);
      message.success("Applied improved text!");
      handleClose();
    }
  };

  const handleCopy = () => {
    if (improvedText) {
      navigator.clipboard.writeText(improvedText);
      message.success("Copied to clipboard!");
    }
  };

  const handleClose = () => {
    setOriginalText("");
    setImprovedText("");
    setAction("improve");
    onClose();
  };

  return (
    <Modal
      title={
        <Space>
          <ThunderboltOutlined className="text-violet-600" />
          <span>AI Bullet Point Improver</span>
        </Space>
      }
      open={open}
      onCancel={handleClose}
      width={700}
      footer={null}
      destroyOnClose
    >
      <div className="space-y-4 py-4">
        {/* Original Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Text
          </label>
          <TextArea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Enter your bullet point here..."
            rows={4}
            className="w-full"
          />
        </div>

        {/* Action Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Improvement Type
          </label>
          <Radio.Group
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio value="improve">
                <span className="font-medium">General Improvement</span>
                <p className="text-xs text-gray-500 ml-6">
                  Make it more professional and action-oriented
                </p>
              </Radio>
              <Radio value="grammar">
                <span className="font-medium">Fix Grammar</span>
                <p className="text-xs text-gray-500 ml-6">
                  Correct grammar and improve clarity
                </p>
              </Radio>
              <Radio value="ats">
                <span className="font-medium">ATS-Friendly</span>
                <p className="text-xs text-gray-500 ml-6">
                  Optimize for Applicant Tracking Systems
                </p>
              </Radio>
              <Radio value="impactful">
                <span className="font-medium">More Impactful</span>
                <p className="text-xs text-gray-500 ml-6">
                  Add metrics and emphasize achievements
                </p>
              </Radio>
            </Space>
          </Radio.Group>
        </div>

        {/* Improve Button */}
        <Button
          type="primary"
          icon={<ThunderboltOutlined />}
          onClick={handleImprove}
          loading={loading}
          block
          size="large"
          className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none hover:from-violet-700 hover:to-indigo-700"
        >
          {loading ? "Improving..." : "Improve with AI"}
        </Button>

        {/* Improved Text Display */}
        <AnimatePresence>
          {improvedText && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg p-4 border border-violet-200">
                <div className="flex items-start justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Improved Text
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
                      onClick={handleImprove}
                    >
                      Regenerate
                    </Button>
                  </Space>
                </div>
                <p className="text-gray-800 leading-relaxed">{improvedText}</p>
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
                  Apply This Version
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
                AI is improving your text...
              </p>
            </Space>
          </div>
        )}

        {/* Tips */}
        {!improvedText && !loading && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-2">💡 Tips:</p>
            <ul className="text-xs text-blue-700 space-y-1 ml-4">
              <li>• Be specific about your achievements</li>
              <li>• Include numbers and metrics when possible</li>
              <li>• Start with strong action verbs</li>
              <li>• Focus on results and impact</li>
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
}
