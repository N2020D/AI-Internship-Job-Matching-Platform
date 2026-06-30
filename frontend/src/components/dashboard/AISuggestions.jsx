import { HiCheckCircle, HiExclamationTriangle, HiSparkles } from "react-icons/hi2";

function AISuggestions({ profile }) {
  const generateSuggestions = () => {
    const suggestions = [];

    // Based on ATS Score
    if (profile?.atsScore) {
      if (profile.atsScore < 70) {
        suggestions.push({
          text: `Improve your resume format. Current ATS Score: ${profile.atsScore}%`,
          priority: "high",
          icon: "warning"
        });
      } else if (profile.atsScore < 85) {
        suggestions.push({
          text: `Optimize your resume further. Current ATS Score: ${profile.atsScore}%`,
          priority: "medium",
          icon: "info"
        });
      } else {
        suggestions.push({
          text: `Great ATS Score! Your resume is well-optimized at ${profile.atsScore}%`,
          priority: "low",
          icon: "success"
        });
      }
    }

    // Based on Missing Skills
    if (profile?.missingSkills && profile.missingSkills.length > 0) {
      const topMissingSkill = profile.missingSkills[0];
      suggestions.push({
        text: `Consider learning "${topMissingSkill}" to expand opportunities`,
        priority: "medium",
        icon: "info"
      });
    }

    // Based on Recommended Roles
    if (profile?.recommendedRoles && profile.recommendedRoles.length > 0) {
      suggestions.push({
        text: `You're a great fit for ${profile.recommendedRoles[0]} roles`,
        priority: "low",
        icon: "success"
      });
    }

    // Profile Completion
    const completion = calculateProfileCompletion(profile);
    if (completion < 100) {
      suggestions.push({
        text: `Complete your profile to ${100 - completion}% to improve visibility`,
        priority: "high",
        icon: "warning"
      });
    } else {
      suggestions.push({
        text: "Your profile is complete! Great job!",
        priority: "low",
        icon: "success"
      });
    }

    // Skills
    if (profile?.resumeSkills && profile.resumeSkills.length === 0) {
      suggestions.push({
        text: "Add your skills to your profile for better job matching",
        priority: "medium",
        icon: "info"
      });
    }

    // Applied jobs
    if (!profile?.resume) {
      suggestions.push({
        text: "Upload your resume to start applying for jobs",
        priority: "high",
        icon: "warning"
      });
    }

    return suggestions.length > 0 ? suggestions : [
      {
        text: "Keep building your profile to unlock more opportunities",
        priority: "low",
        icon: "info"
      }
    ];
  };

  const calculateProfileCompletion = (profile) => {
    let completed = 0;
    const fields = [
      "name", "email", "phone", "university", "degree", 
      "bio", "profileImage", "resume", "linkedin"
    ];
    
    fields.forEach(field => {
      if (profile?.[field]) completed++;
    });

    return Math.round((completed / fields.length) * 100);
  };

  const suggestions = generateSuggestions();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 border-red-200";
      case "medium":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-green-50 border-green-200";
    }
  };

  const getIconColor = (icon) => {
    switch (icon) {
      case "warning":
        return "text-red-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
        <HiSparkles className="text-blue-600" />
        AI Suggestions
      </h2>

      <ul className="space-y-3">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className={`p-4 rounded-lg flex items-start gap-3 border-2 transition-all ${getPriorityColor(
              item.priority
            )}`}
          >
            {item.icon === "warning" && (
              <HiExclamationTriangle className={`${getIconColor(item.icon)} shrink-0 mt-1`} size={18} />
            )}
            {item.icon === "success" && (
              <HiCheckCircle className={`${getIconColor(item.icon)} shrink-0 mt-1`} size={18} />
            )}
            {item.icon === "info" && (
              <HiSparkles className={`${getIconColor(item.icon)} shrink-0 mt-1`} size={18} />
            )}
            <span className="text-gray-700 text-sm font-medium">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AISuggestions;
