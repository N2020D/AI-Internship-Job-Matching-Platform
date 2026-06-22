import RecommendedJobs from "../../components/dashboard/RecommendedJobs";
import AISuggestions from "../../components/dashboard/AISuggestions";
import OptimizedToolSelection from "../../components/dashboard/OptimizedToolSelection";

function StudentAIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Matching</h1>
        <p className="text-gray-600">Personalized internship and job recommendations based on your profile and resume.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <OptimizedToolSelection />
        <RecommendedJobs />
        <AISuggestions />
      </div>
    </div>
  );
}

export default StudentAIPage;
