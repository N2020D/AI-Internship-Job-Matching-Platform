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
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import StudentProfile from "./pages/student/profile/StudentProfile";

import StudentLayout from "./layouts/StudentLayout";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
  path="/"
  element={<StudentLogin />}
/> 

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

</Route>



    
        

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

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