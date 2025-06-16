import { createContext, useContext, useState } from "react";

const FormContext = createContext();
import dayjs from "dayjs";
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const initialFormData = {
    fname: "Sujal",
    lname: "Jain",
    email: "sujal@example.com",
    phone: "1234567890",
    location: "Ahmedabad",
    objective: "To work in a challenging environment...",
    education: [
      {
        degree: "BCA",
        institute: "Silver Oak College",
        year: education.year
          ? [dayjs(education.year[0]), dayjs(education.year[1])]
          : null,
      },
      {
        degree: "XII, Commerce",
        institute: "KGK School",
        year: education.year
          ? [dayjs(education.year[0]), dayjs(education.year[1])]
          : null,
      },
    ],
    trainings: [
      {
        title: "CyberSecurity Workshop",
        organization: " Silver Oak University",
        date: "",
      },
      { title: "RPS Game", organization: " Silver Oak University", date: "" },
    ],
    projects: [
      {
        title: "Innovative Assignment",
        description: "Created a RPS game using HTML/CSS/JS",
      },
      {
        title: "Portfolio Website",
        description: "Built a portfolio website using React and TailwindCSS",
      },
    ],
    skills: ["HTML", "CSS", "JS", "React", "SQL"],
    activities: ["Code Dilemma", "CyberSecurity Workshop"],
    dob: dayjs("2002-01-01"),
    portfolio: "https://codepen.io/sujal984/pen/KwPJLyq",
  };
  const [formData, setFormData] = useState(initialFormData);
  const resetForm = () => setFormData(initialFormData);

  return (
    <FormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};
