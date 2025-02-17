import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import TextProcessor from "./pages/TextProcessor";

const App = () => {
  return (
    <div
      className="bg-gradient-to-t from-[#1e2022] to-[#000000]
 text-white"
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/text-processor" element={<TextProcessor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
