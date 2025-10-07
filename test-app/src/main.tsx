import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UTMProvider } from "react-utm-tracker";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UTMProvider
      captureParams={["utm_source", "utm_medium", "utm_campaign"]}
      cookieExpiryDays={7}
      requireReferrer={false}
    >
      <App />
    </UTMProvider>
  </StrictMode>
);
