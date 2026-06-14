import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

function StudentLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar />

      <div className="flex items-start">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-8 min-w-0">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default StudentLayout;
