"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/lib/stores/useResumeStore";

export default function EditorProvider({
  children,
  initialResume,
}: {
  children: React.ReactNode;
  initialResume: any;
}) {
  const setResumeData = useResumeStore((state) => state.setResumeData);

  useEffect(() => {
    if (initialResume?.data) {
      setResumeData(initialResume.data);
    }
  }, [initialResume, setResumeData]);

  return <>{children}</>;
}
