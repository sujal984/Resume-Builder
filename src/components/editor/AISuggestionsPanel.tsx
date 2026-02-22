"use client";

import { useState } from "react";
import { Card, Button, Space, Spin, message, Collapse, Tag, Progress } from "antd";
import {
  BulbOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  RocketOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

type ATSAnalysis = {
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: {
    found: string[];
    missing: string[];
  };
  formatting: {
    score: number;
    issues: string[];
  };
};

export default function AISuggestionsPanel({ resumeData }: { resumeData: any }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      setAnalysis(data);
      message.success("Resume analyzed successfully!");
    } catch (error) {
      message.error("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#1890ff";
    if (score >= 40) return "#faad14";
    return "#ff4d4f";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <RocketOutlined className="text-xl text-violet-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        </div>
        <p className="text-sm text-gray-600">
          Get AI-powered suggestions to improve your resume
        </p>
      </div>

      <Button
        type="primary"
        size="large"
        icon={<ThunderboltOutlined />}
        onClick={analyzeResume}
        loading={loading}
        block
        className="mb-4 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 border-none hover:from-violet-700 hover:to-indigo-700 shadow-lg"
      >
        Analyze Resume
      </Button>

      <div className="flex-1 overflow-y-auto space-y-4">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <Space direction="vertical" align="center">
                <Spin size="large" />
                <p className="text-sm text-gray-600">Analyzing your resume...</p>
              </Space>
            </motion.div>
          )}

          {analysis && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* ATS Score */}
              <Card className="shadow-md border-violet-200">
                <div className="text-center">
                  <div className="mb-2">
                    <Progress
                      type="circle"
                      percent={analysis.score}
                      strokeColor={getScoreColor(analysis.score)}
                      width={120}
                      format={(percent) => (
                        <div>
                          <div className="text-3xl font-bold">{percent}</div>
                          <div className="text-xs text-gray-500">ATS Score</div>
                        </div>
                      )}
                    />
                  </div>
                  <Tag
                    color={getScoreColor(analysis.score)}
                    className="text-sm font-medium"
                  >
                    {getScoreStatus(analysis.score)}
                  </Tag>
                </div>
              </Card>

              {/* Strengths */}
              {analysis.strengths && analysis.strengths.length > 0 && (
                <Card
                  title={
                    <Space>
                      <CheckCircleOutlined className="text-green-600" />
                      <span>Strengths</span>
                    </Space>
                  }
                  className="shadow-md border-green-200"
                  size="small"
                >
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <StarOutlined className="text-green-600 mt-1 flex-shrink-0" />
                        <span>{strength}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Improvements */}
              {analysis.improvements && analysis.improvements.length > 0 && (
                <Card
                  title={
                    <Space>
                      <BulbOutlined className="text-amber-600" />
                      <span>Suggestions</span>
                    </Space>
                  }
                  className="shadow-md border-amber-200"
                  size="small"
                >
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <WarningOutlined className="text-amber-600 mt-1 flex-shrink-0" />
                        <span>{improvement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Keywords */}
              {analysis.keywords && (
                <Collapse
                  items={[
                    {
                      key: "keywords",
                      label: "Keyword Analysis",
                      children: (
                        <Space direction="vertical" className="w-full">
                          {analysis.keywords.found &&
                            analysis.keywords.found.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-gray-600 mb-2">
                                  Found Keywords:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {analysis.keywords.found.map((keyword, index) => (
                                    <Tag key={index} color="green" className="text-xs">
                                      {keyword}
                                    </Tag>
                                  ))}
                                </div>
                              </div>
                            )}
                          {analysis.keywords.missing &&
                            analysis.keywords.missing.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-gray-600 mb-2">
                                  Missing Keywords:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {analysis.keywords.missing.map((keyword, index) => (
                                    <Tag key={index} color="red" className="text-xs">
                                      {keyword}
                                    </Tag>
                                  ))}
                                </div>
                              </div>
                            )}
                        </Space>
                      ),
                    },
                  ]}
                  className="shadow-sm"
                />
              )}

              {/* Formatting Score */}
              {analysis.formatting && (
                <Card
                  title="Formatting Score"
                  className="shadow-md border-blue-200"
                  size="small"
                >
                  <Progress
                    percent={analysis.formatting.score}
                    strokeColor="#1890ff"
                    size="small"
                  />
                  {analysis.formatting.issues &&
                    analysis.formatting.issues.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {analysis.formatting.issues.map((issue, index) => (
                          <li key={index} className="text-xs text-gray-600">
                            • {issue}
                          </li>
                        ))}
                      </ul>
                    )}
                </Card>
              )}
            </motion.div>
          )}

          {!analysis && !loading && (
            <Card className="shadow-md border-gray-200">
              <div className="text-center py-8">
                <BulbOutlined className="text-5xl text-gray-300 mb-4" />
                <p className="text-sm text-gray-600">
                  Click "Analyze Resume" to get AI-powered insights and suggestions
                </p>
              </div>
            </Card>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
