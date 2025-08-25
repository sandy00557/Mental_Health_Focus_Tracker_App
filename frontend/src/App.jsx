import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import DashBoardPage from "./pages/DashBoardPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import VideosSection from "./components/VideosSection.jsx";
import ProductsSection from "./components/ProductsSection.jsx";
import GamesSection from "./components/GamesSection.jsx";
import CoachSection from "./components/CoachSection.jsx";
import VoiceToText from "./components/VoicetextSection.jsx";
import OfflineAnimation from "./components/OfflineAnimations.jsx";
import "./index.css";

function App() {
  return (
    <>
      <OfflineAnimation />
      {/* step 1:call the component */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route
          path="/DashBoardPage/*"
          element={
            // <ProtectedRoute>
            //   <DashBoardPage />
            // </ProtectedRoute>
            <DashBoardPage />
          }
        />
        <Route
          path="/DashBoardPage/VideosSection"
          element={<VideosSection />}
        />
        <Route path="/DashBoardPage/GamesSection" element={<GamesSection />} />
        <Route
          path="/DashBoardPage/ProductsSection"
          element={<ProductsSection />}
        />
        <Route path="/DashBoardPage/CoachSection" element={<CoachSection />} />
        <Route
          path="/DashBoardPage/VoicetextSection"
          element={<VoiceToText />}
        />
        {/* <Route path="/DashBoardPage" element={<DashBoardPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
