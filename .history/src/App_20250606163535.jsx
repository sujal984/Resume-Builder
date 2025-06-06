
import { Routes, Route } from "react-router-dom";
import { Routee } from "./constant/Route";
import "./App.css";
=======
<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import { Routee } from "./constant/Route";
import "./App.css";
=======
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Routee } from "./constant/Route";
>>>>>>> 357cfcf9c2c2a47db71b2c88d57144601d98318c
>>>>>>> b8fbc5cf7f88059c0987c875803e2434342264bc

import ErrorPage from "./components/common/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        {Object.values(Routee).map((route) => {
          const Component = route.component;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Component title={route.title} />}
            />
          );
        })}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
