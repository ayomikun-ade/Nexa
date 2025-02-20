import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import TextProcessor from "./pages/TextProcessor";
import TermsConditions from "./pages/TermsConditions";

const App = () => {
  return (
    <div
      className="bg-gradient-to-t from-[#2c2c2c] to-[#000000]
 text-white"
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/text-processor" element={<TextProcessor />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
