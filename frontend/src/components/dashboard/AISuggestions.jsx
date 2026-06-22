import { HiCheckCircle } from "react-icons/hi2";

function AISuggestions() {
  const suggestions = [
    "Improve your resume summary.",
    "Add React projects.",
    "Learn Docker.",
    "Complete profile to 100%.",
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-4">
        AI Suggestions
      </h2>

      <ul className="space-y-3">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="bg-green-50 p-3 rounded-lg flex items-center gap-2 text-gray-700"
          >
            <HiCheckCircle className="text-green-600 shrink-0" size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AISuggestions;
