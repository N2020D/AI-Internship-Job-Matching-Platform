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
            className="bg-green-50 p-3 rounded-lg"
          >
            ✅ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AISuggestions;