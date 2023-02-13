import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// components
import Header from "./components/globals/Header";
// pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();
  const no_header_in_path = ["/login", "/admin/dashboard"];

  return (
    <div>
      {/* <LandingPage /> */}
      {no_header_in_path?.includes(location?.pathname) ? "" : <Header />}
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
        <Route element={<LandingPage />} path={"/"} />
        <Route element={<Login />} path={"/login"} />
        <Route element={<Dashboard />} path={"/admin/dashboard"} />
      </Routes>
    </div>
  );
}

export default App;
