import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div
      className="bg-gradient-to-l from-[#1e2022] to-[#000000]
 text-white"
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
