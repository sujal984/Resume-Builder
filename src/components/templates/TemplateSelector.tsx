"use client";

import { useState } from "react";
import { Card, Row, Col, Badge, Button, Tabs, Input, Tag, Modal } from "antd";
import { 
  CheckCircleOutlined, 
  CrownOutlined, 
  SearchOutlined,
  EyeOutlined,
  ThunderboltOutlined 
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { getAllTemplates, getTemplatesByCategory, getFreeTemplates, getPremiumTemplates } from "@/lib/templates/registry";
import { ResumeTemplate } from "@/lib/templates/types";

interface TemplateSelectorProps {
  currentTemplateId?: string;
  onSelectTemplate: (templateId: string) => void;
  userPlan?: 'free' | 'pro';
}

export default function TemplateSelector({ 
  currentTemplateId, 
  onSelectTemplate,
  userPlan = 'free' 
}: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);

  const allTemplates = getAllTemplates();
  
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { key: "all", label: "All Templates", count: allTemplates.length },
    { key: "modern", label: "Modern", count: getTemplatesByCategory("modern").length },
    { key: "classic", label: "Classic", count: getTemplatesByCategory("classic").length },
    { key: "minimal", label: "Minimal", count: getTemplatesByCategory("minimal").length },
    { key: "creative", label: "Creative", count: getTemplatesByCategory("creative").length },
    { key: "professional", label: "Professional", count: getTemplatesByCategory("professional").length },
  ];

  const handleSelectTemplate = (template: ResumeTemplate) => {
    if (template.isPremium && userPlan === 'free') {
      Modal.confirm({
        title: 'Premium Template',
        content: 'This is a premium template. Upgrade to Pro to unlock all premium templates.',
        okText: 'Upgrade to Pro',
        cancelText: 'Cancel',
        onOk: () => {
          // Redirect to billing page
          window.location.href = '/billing';
        }
      });
      return;
    }
    onSelectTemplate(template.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
          <p className="text-gray-600 mt-1">
            Select from {allTemplates.length} professionally designed templates
          </p>
        </div>
        {userPlan === 'free' && (
          <Button
            type="primary"
            icon={<CrownOutlined />}
            size="large"
            className="bg-gradient-to-r from-amber-500 to-orange-500 border-none"
            href="/billing"
          >
            Upgrade to Pro
          </Button>
        )}
      </div>

      {/* Search */}
      <Input
        size="large"
        placeholder="Search templates..."
        prefix={<SearchOutlined className="text-gray-400" />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md"
      />

      {/* Category Tabs */}
      <Tabs
        activeKey={selectedCategory}
        onChange={setSelectedCategory}
        items={categories.map(cat => ({
          key: cat.key,
          label: (
            <span>
              {cat.label} <Badge count={cat.count} className="ml-2" />
            </span>
          ),
        }))}
      />

      {/* Template Grid */}
      <Row gutter={[24, 24]}>
        {filteredTemplates.map((template, index) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={template.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                hoverable
                className={`relative overflow-hidden transition-all duration-300 ${
                  currentTemplateId === template.id 
                    ? 'ring-2 ring-violet-500 shadow-xl' 
                    : 'hover:shadow-lg'
                }`}
                cover={
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {/* Template Preview Placeholder */}
                    <div className="text-center p-6">
                      <div className="text-4xl mb-2">{template.layout === 'two-column' ? '📄' : '📃'}</div>
                      <p className="text-sm text-gray-600">{template.name}</p>
                    </div>
                    
                    {/* Premium Badge */}
                    {template.isPremium && (
                      <div className="absolute top-2 right-2">
                        <Badge.Ribbon text="PRO" color="gold" />
                      </div>
                    )}

                    {/* Selected Badge */}
                    {currentTemplateId === template.id && (
                      <div className="absolute top-2 left-2">
                        <Tag icon={<CheckCircleOutlined />} color="success">
                          Selected
                        </Tag>
                      </div>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => setPreviewTemplate(template)}
                      >
                        Preview
                      </Button>
                      <Button
                        type="default"
                        onClick={() => handleSelectTemplate(template)}
                      >
                        {currentTemplateId === template.id ? 'Selected' : 'Use Template'}
                      </Button>
                    </div>
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <div className="flex items-center justify-between">
                      <span>{template.name}</span>
                      {template.isPremium && (
                        <CrownOutlined className="text-amber-500" />
                      )}
                    </div>
                  }
                  description={
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Tag color="blue" className="text-xs">
                          <ThunderboltOutlined /> ATS: {template.atsScore}%
                        </Tag>
                        <Tag color="purple" className="text-xs capitalize">
                          {template.layout.replace('-', ' ')}
                        </Tag>
                      </div>
                    </div>
                  }
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No templates found matching your search.</p>
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        title={previewTemplate?.name}
        open={!!previewTemplate}
        onCancel={() => setPreviewTemplate(null)}
        width={900}
        footer={[
          <Button key="close" onClick={() => setPreviewTemplate(null)}>
            Close
          </Button>,
          <Button
            key="select"
            type="primary"
            onClick={() => {
              if (previewTemplate) {
                handleSelectTemplate(previewTemplate);
                setPreviewTemplate(null);
              }
            }}
          >
            Use This Template
          </Button>,
        ]}
      >
        {previewTemplate && (
          <div className="space-y-4">
            <p className="text-gray-600">{previewTemplate.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="space-y-1">
                  {previewTemplate.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Details:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Category: {previewTemplate.category}</p>
                  <p>Layout: {previewTemplate.layout}</p>
                  <p>ATS Score: {previewTemplate.atsScore}%</p>
                  <p>Type: {previewTemplate.isPremium ? 'Premium' : 'Free'}</p>
                </div>
              </div>
            </div>
            {/* Template preview would go here */}
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Template preview rendering...</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
