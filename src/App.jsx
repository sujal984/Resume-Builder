import { Routes, Route } from "react-router-dom";
import { Routee } from "./constant/Route";
import "./App.css";

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
