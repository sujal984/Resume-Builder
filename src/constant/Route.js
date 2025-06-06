import Home from "../components/common/Home";
import MultiStepForm from "../components/stepforms/MultiStepForm";
import MasterTemplate1 from "../components/templates/MasterTemplate1";
import MasterTemplate2 from "../components/templates/MasterTemplate2";
import MasterTemplate3 from "../components/templates/MasterTemplate3";
import MasterTemplate4 from "../components/templates/MasterTemplate4";
import MasterTemplate5 from "../components/templates/MasterTemplate5";
import MasterTemporary from "../components/templates/MasterTemporary";
import Temporary from "../components/templates/Temporary";
export const Routee = {
  Home: {
    name: "Home",
    component: Home,
    path: "/",
  },

  MultiStepForm: {
    title: "Detaila Form",
    path: "/detail-form",
    component: MultiStepForm,
  },
  Mastertemplate1: {
    title: "Template-1",
    path: "/mastertemplate-1",
    component: MasterTemplate1,
  },
  Mastertemplate2: {
    title: "Template-2",
    path: "/mastertemplate-2",
    component: MasterTemplate2,
  },
  Mastertemplate3: {
    title: "Template-3",
    path: "/mastertemplate-3",
    component: MasterTemplate3,
  },
  Mastertemplate4: {
    title: "Template-4",
    path: "/mastertemplate-4",
    component: MasterTemplate4,
  },
  Mastertemplate5: {
    title: "Template-5",
    path: "/mastertemplate-5",
    component: MasterTemplate5,
  },
  Temporary: {
    title: "Temporary",
    path: "/temporary",
    component: Temporary,
  },
  Mastertemporary: {
    title: "MasterTemporary",
    path: "/mastertemporary",
    component: MasterTemporary,
  },
};
