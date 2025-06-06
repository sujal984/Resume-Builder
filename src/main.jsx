import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import { FormProvider } from "./context/FormContext.jsx";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import "./App.css";
=======
import "./index.css";
>>>>>>> 357cfcf9c2c2a47db71b2c88d57144601d98318c
import App from "./App.jsx";
// import "@ant-design/v5-patch-for-react-19";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
<<<<<<< HEAD
    <FormProvider>
      <App />
    </FormProvider>
=======
    <StrictMode>
      <App />
    </StrictMode>
>>>>>>> 357cfcf9c2c2a47db71b2c88d57144601d98318c
  </BrowserRouter>
);
