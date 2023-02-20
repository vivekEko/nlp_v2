import { Navigate, Route, Routes } from "react-router-dom";
// components
import Header from "./components/globals/user/Header";
// pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AdminSurvey from "./pages/AdminSurvey";
import AdminEditSurvey from "./pages/AdminEditSurvey";
import AdminResponsePage from "./pages/AdminResponsePage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import PublicSurveys from "./pages/PublicSurveys";

function App() {
  return (
    <div className="cursor-default">
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
        <Route element={<LandingPage />} path={"/"} />
        <Route element={<Login />} path={"/login"} />
        <Route element={<AdminSurvey />} path={"/admin/surveys"} />
        <Route element={<AdminEditSurvey />} path={"/admin/edit/:survey_id"} />
        <Route
          element={<AdminResponsePage />}
          path={"/admin/response/:survey_id"}
        />
        <Route
          element={<AdminAnalyticsPage />}
          path={"/admin/analytic/:survey_id"}
        />

<Route
          element={<PublicSurveys />}
          path={"/public/survey/:survey_id"}
        />
      </Routes>
    </div>
  );
}

export default App;
