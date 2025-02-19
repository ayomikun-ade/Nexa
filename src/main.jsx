import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const originTranslatorMeta = document.createElement("meta");
originTranslatorMeta.httpEquiv = "origin-trial";
originTranslatorMeta.content =
  import.meta.env.VITE_TRANSLATOR_ORIGIN_TRIAL_TOKEN;
document.head.append(originTranslatorMeta);

const originDetectorMeta = document.createElement("meta");
originDetectorMeta.httpEquiv = "origin-trial";
originDetectorMeta.content = import.meta.env.VITE_DETECTOR_ORIGIN_TRIAL_TOKEN;
document.head.append(originDetectorMeta);

const originSummarizerMeta = document.createElement("meta");
originSummarizerMeta.httpEquiv = "origin-trial";
originSummarizerMeta.content =
  import.meta.env.VITE_SUMMARIZER_ORIGIN_TRIAL_TOKEN;
document.head.append(originSummarizerMeta);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
