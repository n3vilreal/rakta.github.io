import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "./contexts/authContext/Index";
import Login from "./pages/Login";
import Map from "./pages/Map";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
