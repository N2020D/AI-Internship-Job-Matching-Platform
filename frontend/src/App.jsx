//import { useState } from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import StudentRegister from "./pages/student/StudentRegister";
import StudentLogin from "./pages/student/StudentLogin";

import RecruiterRegister from "./pages/recruiter/RecruiterRegister";
import RecruiterLogin from "./pages/recruiter/RecruiterLogin";

import AdminLogin from "./pages/admin/AdminLogin";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSectionPage from "./pages/student/StudentSectionPage";
import StudentAIPage from "./pages/student/StudentAIPage";
import StudentNotificationsPage from "./pages/student/StudentNotificationsPage";
import StudentSettingsPage from "./pages/student/StudentSettingsPage";
import MainLandingPage from "./pages/MainLandingPage";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import StudentProfile from "./pages/student/profile/StudentProfile";
import EditProfile from "./pages/student/profile/EditProfile";
import ResumePage from "./pages/student/ResumePage";
import JobsPage from "./pages/student/JobsPage";
import ApplicationsPage from "./pages/student/ApplicationsPage";

import StudentLayout from "./layouts/StudentLayout";
import RecruiterLayout from "./layouts/RecruiterLayout";

import PostJobPage from "./pages/recruiter/PostJobPage";
import ManageJobsPage from "./pages/recruiter/ManageJobsPage";
import JobApplicantsPage from "./pages/recruiter/JobApplicantsPage";
import RecruiterCompanyPage from "./pages/recruiter/RecruiterCompanyPage";
import RecruiterAIPage from "./pages/recruiter/RecruiterAIPage";
import RecruiterSettingsPage from "./pages/recruiter/RecruiterSettingsPage";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLandingPage />} />

        <Route
          path="/student/register"
          element={<StudentRegister />}
        />

        <Route
          path="/student/login"
          element={<StudentLogin />}
        />

        <Route
          path="/recruiter/register"
          element={<RecruiterRegister />}
        />

        <Route
          path="/recruiter/login"
          element={<RecruiterLogin />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        



        <Route
  element={
    <ProtectedRoute role="student">
      <StudentLayout />
    </ProtectedRoute>
  }
>

  <Route
    path="/student/dashboard"
    element={<StudentDashboard />}
  />

  <Route
    path="/student/profile/StudentProfile"
    element={<StudentProfile />}
  />

  <Route
    path="/student/profile"
    element={<StudentProfile />}
  />

  <Route
    path="/student/profile/edit"
    element={<EditProfile />}
  />

  <Route
    path="/student/resume"
    element={<ResumePage />}
  />

  <Route
    path="/student/jobs"
    element={<JobsPage />}
  />

  <Route
    path="/student/applications"
    element={<ApplicationsPage />}
  />

  <Route
    path="/student/ai"
    element={<StudentAIPage />}
  />

  <Route
    path="/student/notifications"
    element={<StudentNotificationsPage />}
  />

  <Route
    path="/student/settings"
    element={<StudentSettingsPage />}
  />

</Route>



    
        

        <Route
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/recruiter/dashboard"
            element={<RecruiterDashboard />}
          />

          <Route
            path="/recruiter/post-job"
            element={<PostJobPage />}
          />

          <Route
            path="/recruiter/jobs"
            element={<ManageJobsPage />}
          />

          <Route
            path="/recruiter/applicants/:jobId"
            element={<JobApplicantsPage />}
          />

          <Route
            path="/recruiter/company"
            element={<RecruiterCompanyPage />}
          />

          <Route
            path="/recruiter/ai"
            element={<RecruiterAIPage />}
          />

          <Route
            path="/recruiter/settings"
            element={<RecruiterSettingsPage />}
          />
        </Route>

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>







      
    </BrowserRouter>
  );
}

export default App;
