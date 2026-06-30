import { useEffect, useMemo, useState } from "react";
import {
  HiBriefcase,
  HiBuildingOffice2,
  HiClipboardDocumentList,
  HiCog6Tooth,
  HiDocumentText,
  HiUserGroup,
} from "react-icons/hi2";
import {
  getAdminApplications,
  getAdminJobs,
  getAdminRecruiters,
  getAdminReports,
  getAdminSettings,
  getAdminStudents,
} from "../../services/adminService";

const moduleConfig = {
  students: {
    title: "Students",
    description: "Manage student accounts, resume status, and AI analysis data.",
    icon: HiUserGroup,
    loader: getAdminStudents,
    stats: ["totalStudents", "studentsWithResume", "studentsWithoutResume"],
    tableHeaders: ["Photo", "Name", "Email", "Status", "Action"],
  },
  recruiters: {
    title: "Recruiters",
    description: "Manage recruiter accounts and company records.",
    icon: HiBuildingOffice2,
    loader: getAdminRecruiters,
    stats: ["totalRecruiters", "activeRecruiters", "pendingCompanies"],
    tableHeaders: ["Company", "Recruiter", "Email", "Jobs Posted", "Status", "Action"],
  },
  jobs: {
    title: "Jobs",
    description: "Monitor all jobs, active listings, and application volume.",
    icon: HiBriefcase,
    loader: getAdminJobs,
    stats: ["totalJobs", "openJobs", "closedJobs", "applicationsCount"],
    tableHeaders: ["Job Title", "Company", "Location", "Applicants", "Status", "Posted Date"],
  },
  applications: {
    title: "Applications",
    description: "Monitor student applications across the platform.",
    icon: HiClipboardDocumentList,
    loader: getAdminApplications,
    stats: [],
    tableHeaders: ["Student", "Job", "Company", "Applied Date", "Status"],
  },
  reports: {
    title: "Reports",
    description: "Generate platform reports for students, recruiters, jobs, and applications.",
    icon: HiDocumentText,
    loader: getAdminReports,
    stats: [],
    tableHeaders: ["Report", "Highlights"],
  },
  settings: {
    title: "Settings",
    description: "Configure admin profile and platform settings.",
    icon: HiCog6Tooth,
    loader: getAdminSettings,
    stats: [],
    tableHeaders: ["Setting", "Value"],
  },
};

const statusBadgeClass = (status) => {
  if (!status) return "bg-gray-100 text-gray-700";
  if (status === "Active" || status === "Open") return "bg-green-100 text-green-700";
  if (status === "Inactive" || status === "Closed") return "bg-gray-100 text-gray-700";
  if (status === "Suspended") return "bg-red-100 text-red-700";
  if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  return "bg-blue-100 text-blue-700";
};

function AdminModulePage({ module }) {
  const config = moduleConfig[module] || moduleConfig.students;
  const Icon = config.icon;
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModule = async () => {
      try {
        const data = await config.loader();
        setPayload(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    loadModule();
  }, [config]);

  const rows = useMemo(() => {
    if (module === "students") return payload?.students || [];
    if (module === "recruiters") return payload?.recruiters || [];
    if (module === "jobs") return payload?.jobs || [];
    if (module === "applications") return payload?.applications || [];
    return [];
  }, [module, payload]);

  const stats = payload?.stats || {};

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6 flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
          <Icon size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
          <p className="text-gray-600 mt-1">{config.description}</p>
        </div>
      </div>

      {config.stats.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {config.stats.map((key) => (
            <div key={key} className="bg-white rounded-2xl shadow p-5">
              <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{loading ? "-" : stats[key] ?? 0}</h2>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wide text-gray-500 bg-gray-50">
                {config.tableHeaders.map((header) => (
                  <th key={header} className="px-6 py-3 whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-6 py-6 text-sm text-gray-500" colSpan={config.tableHeaders.length}>Loading...</td>
                </tr>
              ) : module === "students" ? rows.map((student) => (
                <tr key={student._id} className="border-b last:border-0">
                  <td className="px-6 py-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-sm font-semibold text-gray-600">
                      {student.profileImage ? "IMG" : student.name?.charAt(0) || "S"}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(student.status)}`}>{student.status || "Active"}</span></td>
                  <td className="px-6 py-4 text-sm text-blue-700 font-semibold">View / Edit / Delete</td>
                </tr>
              )) : module === "recruiters" ? rows.map((recruiter) => {
                const jobsPosted = recruiter.jobsPosted ?? recruiter.jobsCount ?? 0;
                return (
                  <tr key={recruiter._id} className="border-b last:border-0">
                    <td className="px-6 py-4 text-gray-900 font-medium">{recruiter.company || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-900">{recruiter.name}</td>
                    <td className="px-6 py-4 text-gray-600">{recruiter.email}</td>
                    <td className="px-6 py-4 text-gray-600">{jobsPosted}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(recruiter.status)}`}>{recruiter.status || "Active"}</span></td>
                    <td className="px-6 py-4 text-sm text-blue-700 font-semibold">View / Edit / Delete</td>
                  </tr>
                );
              }) : module === "jobs" ? rows.map((job) => (
                <tr key={job._id} className="border-b last:border-0">
                  <td className="px-6 py-4 text-gray-900 font-medium">{job.title}</td>
                  <td className="px-6 py-4 text-gray-600">{job.company}</td>
                  <td className="px-6 py-4 text-gray-600">{job.location}</td>
                  <td className="px-6 py-4 text-gray-600">{job.applicants?.length || 0}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(job.status)}`}>{job.status}</span></td>
                  <td className="px-6 py-4 text-gray-600">{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-"}</td>
                </tr>
              )) : module === "applications" ? rows.map((application) => (
                <tr key={application._id} className="border-b last:border-0">
                  <td className="px-6 py-4 text-gray-900 font-medium">{application.student?.name || "Student"}</td>
                  <td className="px-6 py-4 text-gray-600">{application.job?.title || "Job"}</td>
                  <td className="px-6 py-4 text-gray-600">{application.job?.company || "Company"}</td>
                  <td className="px-6 py-4 text-gray-600">{application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : "-"}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(application.status)}`}>{application.status}</span></td>
                </tr>
              )) : module === "reports" ? (
                <>
                  <tr className="border-b last:border-0"><td className="px-6 py-4 text-gray-900 font-medium">Student Report</td><td className="px-6 py-4 text-gray-600">Total Students: {payload?.studentReport?.totalStudents || 0}, Average ATS: {payload?.studentReport?.averageATS || 0}</td></tr>
                  <tr className="border-b last:border-0"><td className="px-6 py-4 text-gray-900 font-medium">Recruiter Report</td><td className="px-6 py-4 text-gray-600">Total Recruiters: {payload?.recruiterReport?.totalRecruiters || 0}, Jobs Posted: {payload?.recruiterReport?.jobsPosted || 0}</td></tr>
                  <tr className="border-b last:border-0"><td className="px-6 py-4 text-gray-900 font-medium">Job Report</td><td className="px-6 py-4 text-gray-600">Total Jobs: {payload?.jobReport?.totalJobs || 0}, Open Jobs: {payload?.jobReport?.openJobs || 0}, Closed Jobs: {payload?.jobReport?.closedJobs || 0}</td></tr>
                  <tr className="border-b last:border-0"><td className="px-6 py-4 text-gray-900 font-medium">Application Report</td><td className="px-6 py-4 text-gray-600">Total Applications: {payload?.applicationReport?.totalApplications || 0}</td></tr>
                </>
              ) : (
                <>
                  <tr className="border-b last:border-0"><td className="px-6 py-4 text-gray-900 font-medium">Admin Profile</td><td className="px-6 py-4 text-gray-600">{payload?.adminProfile?.name || "Admin"} - {payload?.adminProfile?.email || ""}</td></tr>
                  <tr className="border-b last:border-0"><td className="px-6 py-4 text-gray-900 font-medium">Resume Upload Size</td><td className="px-6 py-4 text-gray-600">{payload?.platformSettings?.resumeUploadSize || "5MB"}</td></tr>
                  <tr className="border-b last:border-0"><td className="px-6 py-4 text-gray-900 font-medium">Allowed File Types</td><td className="px-6 py-4 text-gray-600">{(payload?.platformSettings?.allowedFileTypes || []).join(", ")}</td></tr>
                  <tr className="border-b last:border-0"><td className="px-6 py-4 text-gray-900 font-medium">Maintenance Mode</td><td className="px-6 py-4 text-gray-600">{payload?.platformSettings?.maintenanceMode ? "On" : "Off"}</td></tr>
                </>
              )}
              {!loading && rows.length === 0 && module !== "reports" && module !== "settings" && (
                <tr>
                  <td className="px-6 py-6 text-sm text-gray-500" colSpan={config.tableHeaders.length}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminModulePage;
