import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import TextProcessor from "./pages/TextProcessor";
import Documentation from "./pages/Documentation";

const App = () => {
  return (
    <div
      className="bg-fixed bg-gradient-to-t from-[#2c2c2c] to-[#000000]
 text-white"
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/text-processor" element={<TextProcessor />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
