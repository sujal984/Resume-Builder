"use client";

import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Space,
  Card,
  message,
  Modal,
  Tabs,
  FormInstance,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ThunderboltOutlined,
  CheckOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  highlights: string[];
}

interface ExperienceFormProps {
  form: FormInstance;
  initialValues?: ExperienceItem[];
  onValuesChange?: (values: ExperienceItem[]) => void;
}

export default function ExperienceForm({
  form,
  initialValues = [],
  onValuesChange,
}: ExperienceFormProps) {
  const [experiences, setExperiences] =
    useState<ExperienceItem[]>(initialValues);
  const [enhancingBullet, setEnhancingBullet] = useState<{
    expId: string;
    bulletIndex: number;
  } | null>(null);
  const [enhancedResults, setEnhancedResults] = useState<any>(null);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      highlights: [""],
    };
    const updated = [...experiences, newExp];
    setExperiences(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const removeExperience = (id: string) => {
    const updated = experiences.filter((exp) => exp.id !== id);
    setExperiences(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp,
    );
    setExperiences(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const addBullet = (expId: string) => {
    const updated = experiences.map((exp) =>
      exp.id === expId ? { ...exp, highlights: [...exp.highlights, ""] } : exp,
    );
    setExperiences(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    const updated = experiences.map((exp) => {
      if (exp.id === expId) {
        const newHighlights = [...exp.highlights];
        newHighlights[bulletIndex] = value;
        return { ...exp, highlights: newHighlights };
      }
      return exp;
    });
    setExperiences(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    const updated = experiences.map((exp) => {
      if (exp.id === expId) {
        return {
          ...exp,
          highlights: exp.highlights.filter((_, i) => i !== bulletIndex),
        };
      }
      return exp;
    });
    setExperiences(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const handleEnhanceBullet = async (expId: string, bulletIndex: number) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp || !exp.highlights[bulletIndex]) {
      message.warning("Please enter a bullet point first");
      return;
    }

    setEnhancingBullet({ expId, bulletIndex });

    try {
      const response = await fetch("/api/ai/enhance-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bullet: exp.highlights[bulletIndex],
          context: {
            jobTitle: exp.position,
            company: exp.company,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to enhance");

      const data = await response.json();
      setEnhancedResults(data);
      setShowEnhanceModal(true);
      message.success("AI enhanced your bullet point!");
    } catch (error) {
      message.error("Failed to enhance bullet point");
    } finally {
      setEnhancingBullet(null);
    }
  };

  const applyEnhancedBullet = (version: string) => {
    if (enhancingBullet && enhancedResults) {
      updateBullet(
        enhancingBullet.expId,
        enhancingBullet.bulletIndex,
        enhancedResults[version],
      );
      setShowEnhanceModal(false);
      setEnhancedResults(null);
      message.success("Applied enhanced bullet point!");
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {experiences.map((exp, expIndex) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card
              className="border-2 border-gray-200 hover:border-violet-300 transition-all"
              title={
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">
                    Position {expIndex + 1}
                  </span>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeExperience(exp.id)}
                  >
                    Remove
                  </Button>
                </div>
              }
            >
              <Form layout="vertical" size="large">
                <Form.Item
                  label="Company Name"
                  required
                  validateStatus={
                    !exp.company && exp.company !== undefined ? "error" : ""
                  }
                  help={
                    !exp.company && exp.company !== undefined
                      ? "Company name is required"
                      : ""
                  }
                >
                  <Input
                    placeholder="Google, Microsoft, etc."
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Job Title"
                  required
                  validateStatus={
                    !exp.position && exp.position !== undefined ? "error" : ""
                  }
                  help={
                    !exp.position && exp.position !== undefined
                      ? "Job title is required"
                      : ""
                  }
                >
                  <Input
                    placeholder="Senior Software Engineer"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, "position", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item label="Location">
                  <Input
                    placeholder="San Francisco, CA"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, "location", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Employment Period"
                  required
                  validateStatus={!exp.startDate ? "error" : ""}
                  help={!exp.startDate ? "Start date is required" : ""}
                >
                  <Space className="w-full" direction="vertical">
                    <RangePicker
                      className="w-full"
                      picker="month"
                      format="YYYY-MM"
                      allowClear
                      placeholder={[
                        "Start month",
                        exp.current ? "Present" : "End month",
                      ]}
                      value={[
                        exp.startDate ? dayjs(exp.startDate) : null,
                        exp.current
                          ? null
                          : exp.endDate
                            ? dayjs(exp.endDate)
                            : null,
                      ]}
                      onChange={(dates) => {
                        updateExperience(
                          exp.id,
                          "startDate",
                          dates?.[0]?.format("YYYY-MM") || "",
                        );
                        // If 'current' is on, keep endDate empty
                        if (!exp.current) {
                          updateExperience(
                            exp.id,
                            "endDate",
                            dates?.[1]?.format("YYYY-MM") || "",
                          );
                        }
                      }}
                    />
                    <Checkbox
                      checked={!!exp.current}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        updateExperience(exp.id, "current", checked);
                        if (checked) {
                          // Clear end date if currently working
                          updateExperience(exp.id, "endDate", "");
                        }
                      }}
                    >
                      I currently work here
                    </Checkbox>
                  </Space>
                </Form.Item>

                <Form.Item label="Key Achievements & Responsibilities">
                  <div className="space-y-3">
                    {exp.highlights.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex gap-2">
                        <TextArea
                          rows={2}
                          placeholder="• Led a team of 5 engineers to develop..."
                          value={bullet}
                          onChange={(e) =>
                            updateBullet(exp.id, bulletIndex, e.target.value)
                          }
                          className="flex-1"
                        />
                        <Space direction="vertical">
                          <Button
                            type="primary"
                            icon={<ThunderboltOutlined />}
                            onClick={() =>
                              handleEnhanceBullet(exp.id, bulletIndex)
                            }
                            loading={
                              enhancingBullet?.expId === exp.id &&
                              enhancingBullet?.bulletIndex === bulletIndex
                            }
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none"
                          >
                            AI Enhance
                          </Button>
                          {exp.highlights.length > 1 && (
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => removeBullet(exp.id, bulletIndex)}
                            />
                          )}
                        </Space>
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => addBullet(exp.id)}
                      block
                    >
                      Add Achievement
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={addExperience}
        size="large"
        block
        className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none"
      >
        Add Work Experience
      </Button>

      {/* Enhancement Modal */}
      <Modal
        title="AI Enhanced Bullet Points"
        open={showEnhanceModal}
        onCancel={() => {
          setShowEnhanceModal(false);
          setEnhancedResults(null);
        }}
        width={800}
        footer={null}
      >
        {enhancedResults && (
          <Tabs
            items={[
              {
                key: "standard",
                label: "Standard",
                children: (
                  <div className="space-y-4">
                    <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                      <p className="text-gray-800">
                        {enhancedResults.standard}
                      </p>
                    </div>
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => applyEnhancedBullet("standard")}
                      block
                    >
                      Use This Version
                    </Button>
                  </div>
                ),
              },
              {
                key: "metric",
                label: "Metric-Focused",
                children: (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-gray-800">
                        {enhancedResults.metricFocused}
                      </p>
                    </div>
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => applyEnhancedBullet("metricFocused")}
                      block
                    >
                      Use This Version
                    </Button>
                  </div>
                ),
              },
              {
                key: "impact",
                label: "Impact-Focused",
                children: (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-gray-800">
                        {enhancedResults.impactFocused}
                      </p>
                    </div>
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => applyEnhancedBullet("impactFocused")}
                      block
                    >
                      Use This Version
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        )}

        {enhancedResults?.suggestions && (
          <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-semibold mb-2">💡 Tips:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              {enhancedResults.suggestions.map((tip: string, i: number) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-800 font-medium mb-2">
          💡 Writing Great Bullet Points:
        </p>
        <ul className="text-sm text-blue-700 space-y-1 ml-4">
          <li>
            • Start with strong action verbs (Led, Developed, Increased,
            Reduced)
          </li>
          <li>• Include specific metrics and numbers (%, $, time saved)</li>
          <li>• Show the impact of your work (revenue, efficiency, quality)</li>
          <li>• Use the STAR method (Situation, Task, Action, Result)</li>
          <li>• Keep each point to 1-2 lines maximum</li>
        </ul>
      </div>
    </div>
  );
}
