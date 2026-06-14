import { HiAcademicCap } from "react-icons/hi";

function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <HiAcademicCap
              size={32}
              className="text-white"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800">
          {title}
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          {subtitle}
        </p>

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;