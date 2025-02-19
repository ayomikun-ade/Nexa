import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // html: {
  //   env: {
  //     VITE_TRANSLATOR_ORIGIN_TRIAL_TOKEN: import.meta.env
  //       .VITE_TRANSLATOR_ORIGIN_TRIAL_TOKEN,
  //     VITE_DETECTOR_ORIGIN_TRIAL_TOKEN: import.meta.env
  //       .VITE_DETECTOR_ORIGIN_TRIAL_TOKEN,
  //     VITE_SUMMARIZER_ORIGIN_TRIAL_TOKEN: import.meta.env
  //       .VITE_SUMMARIZER_ORIGIN_TRIAL_TOKEN,
  //   },
  // },
});
