"use client";

import { useState } from "react";
import { Form, Input, DatePicker, Button, Card, Select, FormInstance } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface EducationItem {
  id: string;
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

interface EducationFormProps {
  form: FormInstance;
  initialValues?: EducationItem[];
  onValuesChange?: (values: EducationItem[]) => void;
}

export default function EducationForm({ form, initialValues = [], onValuesChange }: EducationFormProps) {
  const [education, setEducation] = useState<EducationItem[]>(initialValues);

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      institution: "",
      area: "",
      studyType: "",
      startDate: "",
      endDate: "",
      score: "",
      courses: [],
    };
    const updated = [...education, newEdu];
    setEducation(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const removeEducation = (id: string) => {
    const updated = education.filter(edu => edu.id !== id);
    setEducation(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  const updateEducation = (id: string, field: string, value: any) => {
    const updated = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
    if (onValuesChange) onValuesChange(updated);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card
              className="border-2 border-gray-200 hover:border-violet-300 transition-all"
              title={
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">Education {index + 1}</span>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeEducation(edu.id)}
                  >
                    Remove
                  </Button>
                </div>
              }
            >
              <Form layout="vertical" size="large">
                <Form.Item 
                  label="Institution Name" 
                  required
                  validateStatus={!edu.institution && edu.institution !== undefined ? "error" : ""}
                  help={!edu.institution && edu.institution !== undefined ? "Institution name is required" : ""}
                >
                  <Input
                    placeholder="Stanford University"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                  <Form.Item 
                    label="Degree" 
                    required
                    validateStatus={!edu.studyType && edu.studyType !== undefined ? "error" : ""}
                    help={!edu.studyType && edu.studyType !== undefined ? "Degree is required" : ""}
                  >
                    <Select
                      placeholder="Select degree"
                      value={edu.studyType || undefined}
                      onChange={(value) => updateEducation(edu.id, "studyType", value)}
                      options={[
                        { label: "High School Diploma", value: "High School Diploma" },
                        { label: "Associate Degree", value: "Associate Degree" },
                        { label: "Bachelor's Degree", value: "Bachelor's Degree" },
                        { label: "Master's Degree", value: "Master's Degree" },
                        { label: "Doctoral Degree (PhD)", value: "Doctoral Degree" },
                        { label: "MBA", value: "MBA" },
                        { label: "Certificate", value: "Certificate" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item 
                    label="Field of Study" 
                    required
                    validateStatus={!edu.area && edu.area !== undefined ? "error" : ""}
                    help={!edu.area && edu.area !== undefined ? "Field of study is required" : ""}
                  >
                    <Input
                      placeholder="Computer Science"
                      value={edu.area}
                      onChange={(e) => updateEducation(edu.id, "area", e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Form.Item 
                    label="Duration" 
                    required
                    validateStatus={!edu.startDate ? "error" : ""}
                    help={!edu.startDate ? "Start date is required" : ""}
                  >
                    <RangePicker
                      className="w-full"
                      picker="month"
                      value={[
                        edu.startDate ? dayjs(edu.startDate) : null,
                        edu.endDate ? dayjs(edu.endDate) : null
                      ]}
                      onChange={(dates) => {
                        if (dates) {
                          updateEducation(edu.id, "startDate", dates[0]?.format("YYYY-MM") || "");
                          updateEducation(edu.id, "endDate", dates[1]?.format("YYYY-MM") || "");
                        }
                      }}
                    />
                  </Form.Item>

                  <Form.Item label="GPA (Optional)">
                    <Input
                      placeholder="3.8/4.0"
                      value={edu.score}
                      onChange={(e) => updateEducation(edu.id, "score", e.target.value)}
                    />
                  </Form.Item>
                </div>
              </Form>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={addEducation}
        size="large"
        block
        className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none"
      >
        Add Education
      </Button>
    </div>
  );
}
