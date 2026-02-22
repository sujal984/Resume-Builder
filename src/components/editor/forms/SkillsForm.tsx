"use client";

import { useState } from "react";
import { Form, Input, Button, Tag, Select, Card, message, Space, Spin, FormInstance } from "antd";
import { PlusOutlined, ThunderboltOutlined, CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  keywords: string[];
}

interface SkillsFormProps {
  form: FormInstance;
  initialValues?: Skill[];
  onValuesChange?: (values: Skill[]) => void;
  jobTitle?: string;
}

export default function SkillsForm({ form, initialValues = [], onValuesChange, jobTitle }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(initialValues);
  const [newSkill, setNewSkill] = useState("");
  const [suggestingSkills, setSuggestingSkills] = useState(false);

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: 'Intermediate',
      keywords: [newSkill.trim()],
    };
    
    const updated = [...skills, skill];
    setSkills(updated);
    setNewSkill("");
    if (onValuesChange) onValuesChange(updated);
  };

  const removeSkill = (id: string) => {
    const updated = skills.filter(s => s.id !== id);
    setSkills(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const updateSkillLevel = (id: string, level: string) => {
    const updated = skills.map(s =>
      s.id === id ? { ...s, level: level as any } : s
    );
    setSkills(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const handleAISuggest = async () => {
    if (!jobTitle) {
      message.warning("Please enter your job title first");
      return;
    }

    setSuggestingSkills(true);
    try {
      const response = await fetch("/api/ai/suggest-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          currentSkills: skills.map(s => s.name),
        }),
      });

      if (!response.ok) throw new Error("Failed to suggest skills");

      const data = await response.json();
      
      // Add suggested skills
      const newSkills: Skill[] = [];
      
      [...(data.technical || []), ...(data.soft || []), ...(data.trending || [])]
        .slice(0, 10)
        .forEach(skillName => {
          if (!skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
            newSkills.push({
              id: Date.now().toString() + Math.random(),
              name: skillName,
              level: 'Intermediate',
              keywords: [skillName],
            });
          }
        });

      const updated = [...skills, ...newSkills];
      setSkills(updated);
      if (onValuesChange) onValuesChange(updated);
      message.success(`Added ${newSkills.length} AI-suggested skills!`);
    } catch (error) {
      message.error("Failed to suggest skills");
    } finally {
      setSuggestingSkills(false);
    }
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Expert': return 'purple';
      case 'Advanced': return 'blue';
      case 'Intermediate': return 'green';
      case 'Beginner': return 'orange';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Suggest Button */}
      <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">AI Skill Suggestions</h4>
            <p className="text-sm text-gray-600">
              Get personalized skill recommendations based on your role
            </p>
          </div>
          <Button
            type="primary"
            icon={<ThunderboltOutlined />}
            onClick={handleAISuggest}
            loading={suggestingSkills}
            size="large"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none"
          >
            Suggest Skills
          </Button>
        </div>
      </Card>

      {/* Add Skill Input */}
      <Card>
        <Form layout="vertical" size="large">
          <Form.Item label="Add Skills">
            <Space.Compact className="w-full">
              <Input
                placeholder="e.g., JavaScript, Project Management, Leadership"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onPressEnter={addSkill}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addSkill}
                className="bg-violet-600"
              >
                Add
              </Button>
            </Space.Compact>
          </Form.Item>
        </Form>
      </Card>

      {/* Skills List */}
      {skills.length > 0 && (
        <Card title="Your Skills">
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <Tag color={getLevelColor(skill.level)}>{skill.level}</Tag>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={skill.level}
                    onChange={(value) => updateSkillLevel(skill.id, value)}
                    size="small"
                    style={{ width: 120 }}
                    options={[
                      { label: 'Beginner', value: 'Beginner' },
                      { label: 'Intermediate', value: 'Intermediate' },
                      { label: 'Advanced', value: 'Advanced' },
                      { label: 'Expert', value: 'Expert' },
                    ]}
                  />
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => removeSkill(skill.id)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {skills.length === 0 && (
        <Card className="text-center py-8">
          <p className="text-gray-500 mb-4">No skills added yet</p>
          <p className="text-sm text-gray-400">
            Add your skills manually or use AI to suggest relevant skills
          </p>
        </Card>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-800 font-medium mb-2">💡 Skill Tips:</p>
        <ul className="text-sm text-blue-700 space-y-1 ml-4">
          <li>• Include both technical and soft skills</li>
          <li>• Be honest about your proficiency levels</li>
          <li>• Focus on skills relevant to your target role</li>
          <li>• Include industry-standard tools and technologies</li>
          <li>• Update skills regularly as you learn</li>
        </ul>
      </div>
    </div>
  );
}
