import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { initializeWebsiteTheme } from "./app/components/stokta/website-theme";
import "./styles/index.css";

initializeWebsiteTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
