"use client";

import { Form, Input, Row, Col, FormInstance } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, LinkOutlined } from "@ant-design/icons";

interface PersonalInfoFormProps {
  form: FormInstance;
  initialValues?: any;
  onValuesChange?: (changedValues: any, allValues: any) => void;
}

export default function PersonalInfoForm({ form, initialValues, onValuesChange }: PersonalInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-violet-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              initialValue={initialValues?.fullName}
              rules={[
                { required: true, message: "Please enter your full name" },
                { min: 2, message: "Name must be at least 2 characters" },
                { max: 50, message: "Name must be less than 50 characters" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="John Doe"
                onChange={(e) => {
                  if (onValuesChange) {
                    const values = form.getFieldsValue();
                    onValuesChange({ fullName: e.target.value }, { ...values, fullName: e.target.value });
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Job Title"
              name="jobTitle"
              initialValue={initialValues?.jobTitle}
              rules={[
                { required: true, message: "Please enter your job title" },
                { min: 2, message: "Job title must be at least 2 characters" },
              ]}
            >
              <Input
                placeholder="Software Engineer"
                onChange={(e) => {
                  if (onValuesChange) {
                    const values = form.getFieldsValue();
                    onValuesChange({ jobTitle: e.target.value }, { ...values, jobTitle: e.target.value });
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              initialValue={initialValues?.email}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="john@example.com"
                onChange={(e) => {
                  if (onValuesChange) {
                    const values = form.getFieldsValue();
                    onValuesChange({ email: e.target.value }, { ...values, email: e.target.value });
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              initialValue={initialValues?.phone}
              rules={[
                { required: true, message: "Please enter your phone number" },
                { pattern: /^[\d\s\-\+\(\)]+$/, message: "Please enter a valid phone number" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="+1 (555) 123-4567"
                onChange={(e) => {
                  if (onValuesChange) {
                    const values = form.getFieldsValue();
                    onValuesChange({ phone: e.target.value }, { ...values, phone: e.target.value });
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Location"
          name="address"
          initialValue={initialValues?.address}
          rules={[
            { required: true, message: "Please enter your location" },
          ]}
        >
          <Input
            prefix={<EnvironmentOutlined className="text-gray-400" />}
            placeholder="San Francisco, CA"
            onChange={(e) => {
              if (onValuesChange) {
                const values = form.getFieldsValue();
                onValuesChange({ address: e.target.value }, { ...values, address: e.target.value });
              }
            }}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="LinkedIn"
              name="linkedin"
              initialValue={initialValues?.linkedin}
              rules={[
                { type: "url", message: "Please enter a valid URL" },
              ]}
            >
              <Input
                prefix={<LinkOutlined className="text-gray-400" />}
                placeholder="linkedin.com/in/johndoe"
                onChange={(e) => {
                  if (onValuesChange) {
                    const values = form.getFieldsValue();
                    onValuesChange({ linkedin: e.target.value }, { ...values, linkedin: e.target.value });
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Website"
              name="website"
              initialValue={initialValues?.website}
              rules={[
                { type: "url", message: "Please enter a valid URL" },
              ]}
            >
              <Input
                prefix={<LinkOutlined className="text-gray-400" />}
                placeholder="johndoe.com"
                onChange={(e) => {
                  if (onValuesChange) {
                    const values = form.getFieldsValue();
                    onValuesChange({ website: e.target.value }, { ...values, website: e.target.value });
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-800 font-medium mb-2">💡 Tips:</p>
        <ul className="text-sm text-blue-700 space-y-1 ml-4">
          <li>• Use your full legal name as it appears on official documents</li>
          <li>• Include a professional email address</li>
          <li>• Add your LinkedIn profile to increase credibility</li>
          <li>• Location helps with local job searches</li>
        </ul>
      </div>
    </div>
  );
}
