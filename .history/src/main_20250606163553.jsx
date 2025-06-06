import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { FormProvider } from "./context/FormContext.jsx";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import "./App.css";

import App from "./App.jsx";
// import "@ant-design/v5-patch-for-react-19";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FormProvider>
      <App />
    </FormProvider>
  </BrowserRouter>
);
