"use client";

import { useState } from "react";
import { Form, Button, Steps, message } from "antd";
import { LeftOutlined, RightOutlined, CheckOutlined } from "@ant-design/icons";
import { useResumeStore } from "@/lib/stores/useResumeStore";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ProfessionalSummaryForm from "./forms/ProfessionalSummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import { motion, AnimatePresence } from "framer-motion";

export default function EditorCanvas() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const { resumeData, updateItem, setResumeData } = useResumeStore();

  const steps = [
    {
      title: "Personal Info",
      description: "Basic details",
    },
    {
      title: "Summary",
      description: "Professional summary",
    },
    {
      title: "Experience",
      description: "Work history",
    },
    {
      title: "Education",
      description: "Academic background",
    },
    {
      title: "Skills",
      description: "Your expertise",
    },
  ];

  const personalSection = resumeData.sections.find(
    (s) => s.type === "personal",
  );
  const personalItem = personalSection?.items[0];

  const summarySection = resumeData.sections.find((s) => s.type === "summary");
  const summaryItem = summarySection?.items[0];

  const experienceSection = resumeData.sections.find(
    (s) => s.type === "experience",
  );
  const educationSection = resumeData.sections.find(
    (s) => s.type === "education",
  );
  const skillsSection = resumeData.sections.find((s) => s.type === "skills");

  const handleNext = async () => {
    try {
      // Validate based on current step
      if (currentStep === 0 || currentStep === 1) {
        // For Personal Info and Summary, use form validation
        await form.validateFields();
      } else if (currentStep === 2) {
        // For Experience, check if at least one experience exists with required fields
        if (!experienceSection?.items || experienceSection.items.length === 0) {
          message.error("Please add at least one work experience");
          return;
        }
        const hasInvalidExp = experienceSection.items.some(
          (exp: any) => !exp.company || !exp.position || !exp.startDate,
        );
        if (hasInvalidExp) {
          message.error(
            "Please fill in all required fields for work experience",
          );
          return;
        }
      } else if (currentStep === 3) {
        // For Education, check if at least one education exists with required fields
        if (!educationSection?.items || educationSection.items.length === 0) {
          message.error("Please add at least one education entry");
          return;
        }
        const hasInvalidEdu = educationSection.items.some(
          (edu: any) =>
            !edu.institution || !edu.studyType || !edu.area || !edu.startDate,
        );
        if (hasInvalidEdu) {
          message.error("Please fill in all required fields for education");
          return;
        }
      } else if (currentStep === 4) {
        // For Skills, check if at least one skill exists
        if (!skillsSection?.items || skillsSection.items.length === 0) {
          message.error("Please add at least one skill");
          return;
        }
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        message.success("Progress saved!");
      }
    } catch (error) {
      message.error("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePersonalInfoChange = (values: any) => {
    if (personalItem?.id) {
      updateItem("personal", personalItem.id, values);
    }
  };

  const handleSummaryChange = (values: any) => {
    if (summaryItem?.id) {
      updateItem("summary", summaryItem.id, values);
    }
  };

  const handleExperienceChange = (values: any) => {
    const updated = resumeData.sections.map((section) =>
      section.type === "experience" ? { ...section, items: values } : section,
    );
    setResumeData({ ...resumeData, sections: updated });
  };

  const handleEducationChange = (values: any) => {
    const updated = resumeData.sections.map((section) =>
      section.type === "education" ? { ...section, items: values } : section,
    );
    setResumeData({ ...resumeData, sections: updated });
  };

  const handleSkillsChange = (values: any) => {
    const updated = resumeData.sections.map((section) =>
      section.type === "skills" ? { ...section, items: values } : section,
    );
    setResumeData({ ...resumeData, sections: updated });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            form={form}
            initialValues={personalItem}
            onValuesChange={(_, allValues) =>
              handlePersonalInfoChange(allValues)
            }
          />
        );
      case 1:
        return (
          <ProfessionalSummaryForm
            form={form}
            initialValues={summaryItem}
            onValuesChange={(_, allValues) => handleSummaryChange(allValues)}
            jobTitle={personalItem?.jobTitle}
          />
        );
      case 2:
        return (
          <ExperienceForm
            form={form}
            initialValues={(experienceSection?.items as any) || []}
            onValuesChange={handleExperienceChange}
          />
        );
      case 3:
        return (
          <EducationForm
            form={form}
            initialValues={(educationSection?.items as any) || []}
            onValuesChange={handleEducationChange}
          />
        );
      case 4:
        return (
          <SkillsForm
            form={form}
            initialValues={(skillsSection?.items as any) || []}
            onValuesChange={handleSkillsChange}
            jobTitle={personalItem?.jobTitle}
          />
        );
      default:
        return null;
    }
  };

  const completedSteps = [
    !!(personalItem?.fullName && personalItem?.email && personalItem?.phone),
    !!(summaryItem?.content && summaryItem.content.length >= 50),
    !!(
      experienceSection?.items &&
      experienceSection.items.length > 0 &&
      !experienceSection.items.some(
        (exp: any) => !exp.company || !exp.position || !exp.startDate,
      )
    ),
    !!(
      educationSection?.items &&
      educationSection.items.length > 0 &&
      !educationSection.items.some(
        (edu: any) =>
          !edu.institution || !edu.studyType || !edu.area || !edu.startDate,
      )
    ),
    !!(skillsSection?.items && skillsSection.items.length > 0),
  ];

  const isCurrentStepValid = completedSteps[currentStep];

  const completionPercentage = Math.round(
    (completedSteps.filter(Boolean).length / completedSteps.length) * 100,
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Progress Header */}
      <div className="bg-white border-b shadow-sm px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Resume Completion
            </h3>
            <span className="text-sm font-bold text-violet-600">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-violet-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <Steps
            current={currentStep}
            size="small"
            items={steps.map((step, index) => ({
              title: step.title,
              description: step.description,
              status: completedSteps[index]
                ? "finish"
                : currentStep === index
                  ? "process"
                  : "wait",
            }))}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Form form={form} layout="vertical" size="large">
                {renderStepContent()}
              </Form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white border-t shadow-lg px-8 py-4 fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            size="large"
            icon={<LeftOutlined />}
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              type="primary"
              size="large"
              icon={<RightOutlined />}
              onClick={handleNext}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none"
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              onClick={() => message.success("Resume completed!")}
              className="bg-gradient-to-r from-green-600 to-emerald-600 border-none"
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
