"use client";

import { useState } from "react";
import { Card, Button, Input, Progress, Tag, Collapse, Space, message, Spin, Badge } from "antd";
import { 
  ThunderboltOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  BulbOutlined,
  TrophyOutlined 
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const { TextArea } = Input;

interface JobAnalyzerProps {
  resumeData?: any;
}

export default function JobDescriptionAnalyzer({ resumeData }: JobAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      message.warning("Please paste a job description first");
      return;
    }

    setAnalyzing(true);
    try {
      const response = await fetch("/api/ai/analyze-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          resumeData,
        }),
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      setAnalysis(data);
      message.success("Job description analyzed successfully!");
    } catch (error) {
      message.error("Failed to analyze job description");
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#1890ff";
    if (score >= 40) return "#faad14";
    return "#ff4d4f";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    if (score >= 40) return "Fair Match";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card title="Paste Job Description" className="shadow-md">
        <TextArea
          rows={8}
          placeholder="Paste the complete job description here...

Example:
We are looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and AWS. The ideal candidate will have strong problem-solving skills and experience leading technical teams..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="mb-4"
        />
        <Button
          type="primary"
          size="large"
          icon={<ThunderboltOutlined />}
          onClick={handleAnalyze}
          loading={analyzing}
          block
          className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none"
        >
          {analyzing ? "Analyzing..." : "Analyze Job Description"}
        </Button>
      </Card>

      {/* Loading State */}
      {analyzing && (
        <Card className="text-center py-8">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">AI is analyzing the job description...</p>
        </Card>
      )}

      {/* Results */}
      <AnimatePresence>
        {analysis && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Match Score */}
            <Card className="shadow-lg border-2 border-violet-200">
              <div className="text-center">
                <div className="mb-4">
                  <Progress
                    type="circle"
                    percent={analysis.matchScore}
                    strokeColor={getScoreColor(analysis.matchScore)}
                    width={150}
                    format={(percent) => (
                      <div>
                        <div className="text-4xl font-bold">{percent}%</div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                    )}
                  />
                </div>
                <Tag
                  color={getScoreColor(analysis.matchScore)}
                  className="text-base font-medium px-4 py-1"
                >
                  {getScoreLabel(analysis.matchScore)}
                </Tag>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Experience Level</p>
                    <p className="font-semibold capitalize">{analysis.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Industry</p>
                    <p className="font-semibold">{analysis.industryFocus}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Required Keywords */}
            <Card 
              title={
                <Space>
                  <TrophyOutlined className="text-violet-600" />
                  <span>Required Keywords</span>
                </Space>
              }
              className="shadow-md"
            >
              <Collapse
                items={[
                  {
                    key: "technical",
                    label: <Badge count={analysis.requiredKeywords?.technical?.length || 0} className="mr-2">Technical Skills</Badge>,
                    children: (
                      <div className="flex flex-wrap gap-2">
                        {analysis.requiredKeywords?.technical?.map((keyword: string, i: number) => (
                          <Tag key={i} color="blue">{keyword}</Tag>
                        ))}
                      </div>
                    ),
                  },
                  {
                    key: "soft",
                    label: <Badge count={analysis.requiredKeywords?.soft?.length || 0} className="mr-2">Soft Skills</Badge>,
                    children: (
                      <div className="flex flex-wrap gap-2">
                        {analysis.requiredKeywords?.soft?.map((keyword: string, i: number) => (
                          <Tag key={i} color="green">{keyword}</Tag>
                        ))}
                      </div>
                    ),
                  },
                  {
                    key: "tools",
                    label: <Badge count={analysis.requiredKeywords?.tools?.length || 0} className="mr-2">Tools & Technologies</Badge>,
                    children: (
                      <div className="flex flex-wrap gap-2">
                        {analysis.requiredKeywords?.tools?.map((keyword: string, i: number) => (
                          <Tag key={i} color="purple">{keyword}</Tag>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </Card>

            {/* Skill Gaps */}
            {analysis.skillGaps && analysis.skillGaps.length > 0 && (
              <Card
                title={
                  <Space>
                    <WarningOutlined className="text-amber-600" />
                    <span>Skill Gaps to Address</span>
                  </Space>
                }
                className="shadow-md border-amber-200"
              >
                <ul className="space-y-2">
                  {analysis.skillGaps.map((gap: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <WarningOutlined className="text-amber-600 mt-1" />
                      <span className="text-gray-700">{gap}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Priority Skills */}
            {analysis.prioritySkills && analysis.prioritySkills.length > 0 && (
              <Card
                title={
                  <Space>
                    <CheckCircleOutlined className="text-green-600" />
                    <span>Priority Skills to Highlight</span>
                  </Space>
                }
                className="shadow-md border-green-200"
              >
                <div className="space-y-2">
                  {analysis.prioritySkills.map((skill: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <span className="font-bold text-green-600">#{i + 1}</span>
                      <span className="text-gray-800">{skill}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <Card
                title={
                  <Space>
                    <BulbOutlined className="text-blue-600" />
                    <span>Actionable Recommendations</span>
                  </Space>
                }
                className="shadow-md border-blue-200"
              >
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircleOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Red Flags */}
            {analysis.redFlags && analysis.redFlags.length > 0 && (
              <Card
                title={
                  <Space>
                    <WarningOutlined className="text-red-600" />
                    <span>Potential Concerns</span>
                  </Space>
                }
                className="shadow-md border-red-200"
              >
                <ul className="space-y-2">
                  {analysis.redFlags.map((flag: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <WarningOutlined className="text-red-600 mt-1" />
                      <span className="text-gray-700">{flag}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Culture Insights */}
            {analysis.cultureInsights && analysis.cultureInsights.length > 0 && (
              <Card
                title="Company Culture Insights"
                className="shadow-md"
              >
                <ul className="space-y-2">
                  {analysis.cultureInsights.map((insight: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-violet-600">•</span>
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      {!analysis && !analyzing && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800 font-medium mb-2">💡 How to use:</p>
          <ul className="text-sm text-blue-700 space-y-1 ml-4">
            <li>• Copy the complete job description from the job posting</li>
            <li>• Paste it in the text area above</li>
            <li>• Click "Analyze" to get AI-powered insights</li>
            <li>• Use the recommendations to tailor your resume</li>
            <li>• Focus on highlighting the priority skills identified</li>
          </ul>
        </div>
      )}
    </div>
  );
}
