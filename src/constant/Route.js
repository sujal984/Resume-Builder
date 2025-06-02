import Personal from "../components/stepforms/Personal";
import Experience from "../components/stepforms/Experience";
import Education from "../components/stepforms/Education";
import Language from "../components/stepforms/Language";
import Skill from "../components/stepforms/Skill";
import Projects from "../components/stepforms/Projects";
import Reference from "../components/stepforms/Reference";
import Home from "../components/common/Home";
import Achivement from "../components/stepforms/Achivement";

export const Routee = {
  Home: {
    id: 1,
    name: "Home",
    component: Home,
    path: "/",
  },
  PersonalDetails: {
    id: 2,
    title: "Personal Details",
    path: "/personal-details",
    component: Personal,
  },
  Experience: {
    id: 3,
    title: "Experience",
    path: "/experience",
    component: Experience,
  },
  Education: {
    id: 4,
    title: "Education",
    path: "/education",
    component: Education,
  },
  Language: {
    id: 5,
    title: "Language",
    path: "/language",
    component: Language,
  },
  Skill: {
    id: 6,
    title: "Skill",
    path: "/skill",
    component: Skill,
  },
  Projects: {
    id: 7,
    title: "Projects",
    path: "/projects",
    component: Projects,
  },
  Reference: {
    id: 8,
    title: "Reference",
    path: "/reference",
    component: Reference,
  },
  Achivement: {
    id: 9,
    title: "Achivement",
    path: "/achivement",
    component: Achivement,
  },
  //   Error: {
  //     id: 9,
  //     title: "Error",
  //     path: "/error",
  //     Component: ErrorPage,

  //   }
};
