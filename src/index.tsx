import React from "react";
import ReactDOM from "react-dom/client";
import "./style/global.css";
import App from "./page/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecondPage from "./page/SecondPage";
import ThirdPage from "./page/ThirdPage";
import Layouts from "./components/layouts/Layouts";
import LegoProvider from "./Context/Lego";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Layouts>
          <LegoProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/second-page" element={<SecondPage />} />
              <Route path="/third-page/:id" element={<ThirdPage />} />
            </Routes>
          </LegoProvider>
        </Layouts>
      </BrowserRouter>
  </React.StrictMode>
);
