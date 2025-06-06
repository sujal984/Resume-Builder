import { Component } from "react";
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
<<<<<<< HEAD
export const Template = {
  T1: {
    id: 1,
    name: "Resume-1",

    title: "Template 1",
    description: " Resume  without image ",
    path: "/mastertemplate-1",
    src: "/SujalJain_InternshalaResume_page-0001.jpg",
    alt: "An  Resume Template without photo Resume Template preview ",
  },
  T2: {
    id: 2,
    name: "Resume-2",

    title: "Template 2",
    description: "  Resume with image ",
    path: "/mastertemplate-2",
    src: "/Copy of SujaljainCV_page-0001.jpg",
    alt: "An  Resume Template with photo Resume Template preview ",
  },
  T3: {
    id: 3,
    name: "Resume-3",

    title: "Template 3",
    path: "/mastertemplate-3",
    description: "Professional Resume",
    src: "/SujalJain_InternshalaResume_page-0001.jpg",
    alt: "Template-3",
  },
  T4: {
    id: 4,
    name: "Resume-4",

    path: "/mastertemplate-4",
    title: "Template 4",
    description: "Template without image",
    src: "/SujalJain_InternshalaResume_page-0001.jpg",
    alt: "Template-4",
  },
  T5: {
    id: 5,
    name: "Resume-5",

    path: "/mastertemplate-5",
    title: "Template 5",
    description: "Template without image",
    src: "/SujalJain_InternshalaResume_page-0001.jpg",
    alt: "Template-5",
  },
};
=======
export const Template = [
  {
    id: 1,
    name: "Resume-1",
    Component: Template1,
    title: "Template-1",
  },
  {
    id: 2,
    name: "Resume-2",
    Component: Template2,
    title: "Template-2",
  },
  {
    id: 3,
    name: "Resume-3",
    Component: Template3,
    title: "Template-3",
  },
  {
    id: 4,
    name: "Resume-4",
    Component: Template4,
    title: "Template-4",
  },
  {
    id: 5,
    name: "Resume-5",
    Component: Template5,
    title: "Template-5",
  },
];
>>>>>>> 357cfcf9c2c2a47db71b2c88d57144601d98318c
