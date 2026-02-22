"use client";

import { useState } from "react";
import { Form, Input, Button, Divider, message, Progress } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined, GithubOutlined, MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { loginUser, registerUser, loginWithGoogle, loginWithGitHub } from "@/lib/actions/auth";
import { motion } from "framer-motion";
import zxcvbn from "zxcvbn";

type FormValues = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function EnhancedLoginForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [form] = Form.useForm();

  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    const result = zxcvbn(password);
    return (result.score / 4) * 100;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "#ff4d4f";
    if (passwordStrength < 50) return "#faad14";
    if (passwordStrength < 75) return "#1890ff";
    return "#52c41a";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (isRegister && values.name) formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);

      const result = isRegister
        ? await registerUser(formData)
        : await loginUser(formData);

      if (result?.error) {
        message.error(result.error);
      } else {
        message.success(isRegister ? "Account created successfully!" : "Welcome back!");
      }
    } catch (e: unknown) {
      if (
        e &&
        typeof e === "object" &&
        "digest" in e &&
        typeof (e as { digest: unknown }).digest === "string" &&
        (e as { digest: string }).digest.includes("NEXT_REDIRECT")
      ) {
        throw e;
      }
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    try {
      if (provider === "google") {
        await loginWithGoogle();
      } else {
        await loginWithGitHub();
      }
    } catch (e: unknown) {
      if (
        e &&
        typeof e === "object" &&
        "digest" in e &&
        typeof (e as { digest: unknown }).digest === "string" &&
        (e as { digest: string }).digest.includes("NEXT_REDIRECT")
      ) {
        throw e;
      }
      message.error("OAuth login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-100">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-xl shadow-lg">
            R
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            ResumeAI
          </span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-gray-600">
            {isRegister
              ? "Start building your AI-powered resume"
              : "Sign in to continue building"}
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            size="large"
            icon={<GoogleOutlined />}
            onClick={() => handleOAuthLogin("google")}
            className="h-11"
          >
            Google
          </Button>
          <Button
            size="large"
            icon={<GithubOutlined />}
            onClick={() => handleOAuthLogin("github")}
            className="h-11"
          >
            GitHub
          </Button>
        </div>

        <Divider plain>
          <span className="text-xs text-gray-500 uppercase">or continue with email</span>
        </Divider>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          requiredMark={false}
        >
          {isRegister && (
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                { min: 2, message: "Name must be at least 2 characters" }
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Full Name"
                className="h-11"
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Email address"
              className="h-11"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Password must contain uppercase, lowercase, and number"
              }
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="h-11"
              onChange={handlePasswordChange}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {isRegister && passwordStrength > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Password Strength</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: getPasswordStrengthColor() }}
                >
                  {getPasswordStrengthText()}
                </span>
              </div>
              <Progress
                percent={passwordStrength}
                strokeColor={getPasswordStrengthColor()}
                showInfo={false}
                size="small"
              />
            </motion.div>
          )}

          {isRegister && (
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm Password"
                className="h-11"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          )}

          {!isRegister && (
            <div className="flex justify-end mb-4">
              <Link
                href="/forgot-password"
                className="text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
              className="h-12 text-base font-medium bg-gradient-to-r from-violet-600 to-indigo-600 border-none hover:from-violet-700 hover:to-indigo-700 shadow-lg"
            >
              {isRegister ? "Create Account" : "Sign In"}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              form.resetFields();
              setPasswordStrength(0);
            }}
            className="text-sm font-medium text-violet-600 hover:text-violet-700 underline-offset-4 hover:underline"
          >
            {isRegister ? "Sign In" : "Create one"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
