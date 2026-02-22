"use client";

import { useState } from "react";
import { Form, Input, Button, Space, message, Spin, FormInstance } from "antd";
import { ThunderboltOutlined, ReloadOutlined, CheckOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useResumeStore } from "@/lib/stores/useResumeStore";

const { TextArea } = Input;

interface ProfessionalSummaryFormProps {
  form: FormInstance;
  initialValues?: any;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  jobTitle?: string;
}

export default function ProfessionalSummaryForm({ 
  form,
  initialValues, 
  onValuesChange,
  jobTitle 
}: ProfessionalSummaryFormProps) {
  const [generating, setGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState("");
  const { resumeData } = useResumeStore();

  const localFallbackSummary = () => {
    const personal = resumeData.sections.find(s => s.type === "personal");
    const p = (personal?.items[0] || {}) as any;
    const name = p.fullName || "A dedicated professional";
    const title = jobTitle || p.jobTitle || "Professional";
    const years = "3+ years";
    const skillsSection = resumeData.sections.find(s => s.type === "skills");
    const skillsList = (skillsSection?.items || []).map((i:any) => i.name).filter(Boolean);
    const topSkills = skillsList.slice(0,3).join(", ");
    const companyExp = "delivering results across fast-paced environments";
    const closing = "Focused on impact, quality, and continuous improvement.";
    const base = `${name} (${title}) with ${years} of experience ${companyExp}.`;
    const skills = topSkills ? ` Core strengths include ${topSkills}.` : "";
    const value = ` Known for ownership, clear communication, and problem solving. ${closing}`;
    return `${base}${skills}${value}`;
  };

  const handleAIGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: jobTitle || "Professional",
          experience: "5+ years",
          skills: "Leadership, Communication, Problem Solving"
        }),
      });

      if (!response.ok) {
        let msg = "Failed to generate summary";
        try {
          const err = await response.json();
          if (err?.error) msg = err.error;
        } catch {}
        const fallback = localFallbackSummary();
        setGeneratedSummary(fallback);
        message.warning(`${msg}. Generated a local summary instead.`);
        return;
      }

      const data = await response.json();
      setGeneratedSummary(data.summary);
      message.success("AI summary generated successfully!");
    } catch (error) {
      const fallback = localFallbackSummary();
      setGeneratedSummary(fallback);
      message.warning("AI not available. Generated a local summary instead.");
    } finally {
      setGenerating(false);
    }
  };

  const handleApplySummary = () => {
    form.setFieldsValue({ content: generatedSummary });
    message.success("Summary applied!");
    setGeneratedSummary("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-violet-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Professional Summary</h3>
          <Button
            type="primary"
            size="small"
            icon={<ThunderboltOutlined />}
            onClick={handleAIGenerate}
            loading={generating}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none"
          >
            AI Generate
          </Button>
        </div>

        <Form.Item
          name="content"
          initialValue={initialValues?.content}
          rules={[
            { required: true, message: "Please enter your professional summary" },
            { min: 50, message: "Summary should be at least 50 characters" },
            { max: 500, message: "Summary should be less than 500 characters" },
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Write a compelling professional summary that highlights your experience, skills, and career goals. Focus on your unique value proposition and what makes you stand out..."
            showCount
            maxLength={500}
            onChange={(e) => {
              if (onValuesChange) {
                const values = form.getFieldsValue();
                onValuesChange({ content: e.target.value }, { ...values, content: e.target.value });
              }
            }}
          />
        </Form.Item>
      </div>

      {/* AI Generated Summary Preview */}
      <AnimatePresence>
        {generatedSummary && !generating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg p-6 border-2 border-violet-200 shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-base font-semibold text-gray-900">AI Generated Summary</h4>
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={handleAIGenerate}
              >
                Regenerate
              </Button>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">{generatedSummary}</p>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleApplySummary}
              block
              size="large"
              className="bg-green-600 hover:bg-green-700"
            >
              Use This Summary
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {generating && (
        <div className="flex items-center justify-center py-8 bg-white rounded-lg shadow-md">
          <Space direction="vertical" align="center">
            <Spin size="large" />
            <p className="text-sm text-gray-600">AI is crafting your professional summary...</p>
          </Space>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-800 font-medium mb-2">💡 Pro Tips:</p>
        <ul className="text-sm text-blue-700 space-y-1 ml-4">
          <li>• Keep it concise (3-4 sentences, 80-120 words)</li>
          <li>• Highlight your unique value proposition</li>
          <li>• Include years of experience and key skills</li>
          <li>• Focus on achievements, not just responsibilities</li>
          <li>• Tailor it to your target role</li>
        </ul>
      </div>
    </div>
  );
}
