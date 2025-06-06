import React, { createContext, useContext, useState } from "react";

// Create the context
const FormContext = createContext();

// Custom hook for easy context usage
export const useFormContext = () => useContext(FormContext);

// Provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [stepNo, setStepNo] = useState(0);
  const [newStep, setNewStep] = useState(false);

  // Optionally, add a reset function
  const resetForm = () => {
    setFormData({});
    setStepNo(0);
    setNewStep(false);
  };
};
