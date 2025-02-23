import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import TextProcessor from "./pages/TextProcessor";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div
        className="bg-fixed bg-gradient-to-t from-[#2c2c2c] to-[#000000]
 text-white"
      >
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/text-processor" element={<TextProcessor />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>{" "}
      </div>
    </BrowserRouter>
  );
};

export default App;
