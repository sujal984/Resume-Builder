"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Empty,
  Input,
  Modal,
  message,
  Dropdown,
  Space,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  DownloadOutlined,
  MoreOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TEMPLATE_REGISTRY } from "@/lib/templates/registry";
import { useRouter } from "next/navigation";

type Resume = {
  id: string;
  title: string;
  slug: string;
  templateId: string | null;
  updatedAt: Date | null;
  createdAt: Date | null;
};

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function DashboardClient({
  resumes,
  user,
}: {
  resumes: Resume[];
  user: User;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredResumes = resumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateResume = async () => {
    if (!newResumeTitle.trim()) {
      message.error("Please enter a resume title");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/resumes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newResumeTitle }),
      });

      if (!response.ok) throw new Error("Failed to create resume");

      const { resumeId } = await response.json();
      message.success("Resume created successfully!");
      router.push(`/editor/${resumeId}`);
    } catch (error) {
      message.error("Failed to create resume");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    Modal.confirm({
      title: "Delete Resume",
      content:
        "Are you sure you want to delete this resume? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        try {
          const response = await fetch(`/api/resumes/${resumeId}`, {
            method: "DELETE",
          });

          if (!response.ok) throw new Error("Failed to delete");

          message.success("Resume deleted successfully");
          router.refresh();
        } catch (error) {
          message.error("Failed to delete resume");
        }
      },
    });
  };

  const handleDuplicateResume = async (resumeId: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/duplicate`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to duplicate");

      message.success("Resume duplicated successfully");
      router.refresh();
    } catch (error) {
      message.error("Failed to duplicate resume");
    }
  };

  const getMenuItems = (resume: Resume) => [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      onClick: () => router.push(`/editor/${resume.id}`),
    },
    {
      key: "duplicate",
      icon: <CopyOutlined />,
      label: "Duplicate",
      onClick: () => handleDuplicateResume(resume.id),
    },
    {
      key: "download",
      icon: <DownloadOutlined />,
      label: "Download PDF",
      onClick: () => window.open(`/api/resumes/${resume.id}/pdf`, "_blank"),
    },
    {
      type: "divider" as const,
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      danger: true,
      onClick: () => handleDeleteResume(resume.id),
    },
  ];

  const formatDate = (date: Date | null) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-lg shadow-lg">
                  R
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  ResumeAI
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.name || user.email}
              </span>
              <Button href="/" className="border-gray-300" variant="outlined">
                Home
              </Button>
              <Button type="primary" href="/api/auth/signout">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Resumes
            </h1>
            <p className="text-gray-600">
              {resumes.length} {resumes.length === 1 ? "resume" : "resumes"}
            </p>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
            className="h-12 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 border-none hover:from-violet-700 hover:to-indigo-700 shadow-lg"
          >
            Create New Resume
          </Button>
        </div>

        {/* Search */}
        {resumes.length > 0 && (
          <div className="mb-6">
            <Input
              size="large"
              placeholder="Search resumes..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
        )}

        {/* Resume Grid */}
        {filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  hoverable
                  className="h-full shadow-md hover:shadow-xl transition-all duration-300 border-gray-200"
                  cover={
                    <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                      <Image
                        src={
                          TEMPLATE_REGISTRY[resume.templateId || "professional"]
                            ?.thumbnail || "/templates/modern-thumb.png"
                        }
                        alt="Template thumbnail"
                        width={640}
                        height={240}
                        className="object-cover w-full h-full"
                        priority
                      />
                    </div>
                  }
                  actions={[
                    <Button
                      key="edit"
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => router.push(`/editor/${resume.id}`)}
                    >
                      Edit
                    </Button>,
                    <Dropdown
                      key="more"
                      menu={{ items: getMenuItems(resume) }}
                      trigger={["click"]}
                    >
                      <Button type="text" icon={<MoreOutlined />}>
                        More
                      </Button>
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <div className="flex items-start justify-between">
                        <span className="text-lg font-semibold truncate">
                          {resume.title}
                        </span>
                      </div>
                    }
                    description={
                      <Space
                        direction="vertical"
                        size="small"
                        className="w-full"
                      >
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <ClockCircleOutlined />
                          <span>Updated {formatDate(resume.updatedAt)}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Template: {resume.templateId || "Professional"}
                        </div>
                      </Space>
                    }
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-4">
                    {searchQuery
                      ? "No resumes found matching your search"
                      : "No resumes yet"}
                  </p>
                  {!searchQuery && (
                    <Button
                      type="primary"
                      size="large"
                      icon={<PlusOutlined />}
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none"
                    >
                      Create Your First Resume
                    </Button>
                  )}
                </div>
              }
            />
          </div>
        )}
      </main>

      {/* Create Resume Modal */}
      <Modal
        title="Create New Resume"
        open={isCreateModalOpen}
        onOk={handleCreateResume}
        onCancel={() => {
          setIsCreateModalOpen(false);
          setNewResumeTitle("");
        }}
        okText="Create"
        confirmLoading={loading}
        okButtonProps={{
          className: "bg-violet-600 hover:bg-violet-700",
        }}
      >
        <div className="py-4">
          <Input
            size="large"
            placeholder="e.g., Software Engineer Resume"
            value={newResumeTitle}
            onChange={(e) => setNewResumeTitle(e.target.value)}
            onPressEnter={handleCreateResume}
            autoFocus
          />
        </div>
      </Modal>
    </div>
  );
}
