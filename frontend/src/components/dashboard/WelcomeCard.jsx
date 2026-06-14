function WelcomeCard({ profile }) {
  return (
    <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 shadow-lg">
      <h1 className="text-3xl font-bold">
        Welcome Back, {profile?.name || "Student"}
      </h1>

      <p className="mt-2 text-blue-100">
        Here's an overview of your internship journey today.
      </p>
    </div>
  );
}

export default WelcomeCard;
