import { useMemo, useState } from "react";
import {
  HiAcademicCap,
  HiAdjustmentsHorizontal,
  HiBriefcase,
  HiChartBarSquare,
  HiCheckCircle,
  HiClipboardDocumentCheck,
  HiCodeBracket,
  HiSparkles,
  HiUserGroup,
} from "react-icons/hi2";

const toolCatalog = [
  {
    id: "job-match",
    name: "Job Match Scanner",
    icon: HiBriefcase,
    focus: "Find roles with the strongest profile fit.",
    weights: { placement: 4, resume: 1, skills: 2, interview: 0 },
  },
  {
    id: "resume",
    name: "Resume Optimizer",
    icon: HiClipboardDocumentCheck,
    focus: "Improve resume clarity, keywords, and structure.",
    weights: { placement: 2, resume: 4, skills: 1, interview: 0 },
  },
  {
    id: "skills",
    name: "Skill Gap Planner",
    icon: HiCodeBracket,
    focus: "Prioritize missing skills for target roles.",
    weights: { placement: 2, resume: 1, skills: 4, interview: 1 },
  },
  {
    id: "interview",
    name: "Interview Coach",
    icon: HiUserGroup,
    focus: "Practice role-specific interview questions.",
    weights: { placement: 1, resume: 0, skills: 1, interview: 4 },
  },
  {
    id: "learning",
    name: "Learning Path Builder",
    icon: HiAcademicCap,
    focus: "Turn target skills into a practical study plan.",
    weights: { placement: 1, resume: 0, skills: 3, interview: 1 },
  },
];

const goalOptions = [
  { id: "placement", label: "Get matched" },
  { id: "resume", label: "Fix resume" },
  { id: "skills", label: "Close gaps" },
  { id: "interview", label: "Prepare" },
];

const signalOptions = [
  { id: "hasResume", label: "Resume uploaded", boosts: { resume: 2, "job-match": 1 } },
  { id: "hasProjects", label: "Projects listed", boosts: { "job-match": 1, interview: 1 } },
  { id: "needsSkills", label: "Needs skill roadmap", boosts: { skills: 2, learning: 2 } },
  { id: "readyToApply", label: "Ready to apply", boosts: { "job-match": 2, interview: 1 } },
];

function OptimizedToolSelection() {
  const [goal, setGoal] = useState("placement");
  const [signals, setSignals] = useState(["hasResume", "needsSkills"]);

  const rankedTools = useMemo(() => {
    return toolCatalog
      .map((tool) => {
        const signalBoost = signals.reduce((score, signalId) => {
          const signal = signalOptions.find((item) => item.id === signalId);
          return score + (signal?.boosts[tool.id] || 0);
        }, 0);

        return {
          ...tool,
          score: (tool.weights[goal] || 0) + signalBoost,
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [goal, signals]);

  const selectedTools = rankedTools.slice(0, 3);

  const toggleSignal = (signalId) => {
    setSignals((current) =>
      current.includes(signalId)
        ? current.filter((id) => id !== signalId)
        : [...current, signalId]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
            <HiSparkles size={18} />
            Optimized tool selection
          </div>
          <h2 className="font-bold text-2xl text-gray-900">Choose the best AI tools for your next step</h2>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-semibold">
          <HiChartBarSquare size={18} />
          Top 3 selected
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
              <HiAdjustmentsHorizontal size={18} />
              Primary goal
            </label>
            <div className="grid grid-cols-2 gap-2">
              {goalOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setGoal(option.id)}
                  className={`px-3 py-2 rounded-lg border text-sm font-semibold transition ${
                    goal === option.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-blue-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Profile signals</p>
            <div className="space-y-2">
              {signalOptions.map((signal) => (
                <label
                  key={signal.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 cursor-pointer hover:border-blue-300"
                >
                  <input
                    type="checkbox"
                    checked={signals.includes(signal.id)}
                    onChange={() => toggleSignal(signal.id)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  {signal.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid gap-3">
          {selectedTools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <div
                key={tool.id}
                className="border border-gray-200 rounded-lg p-4 flex items-start gap-4 bg-gray-50"
              >
                <div className="h-11 w-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="font-bold text-gray-900">{tool.name}</h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 rounded-full px-2 py-1">
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{tool.focus}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-700 font-semibold">
                    <HiCheckCircle size={18} />
                    Fit score {tool.score}/6
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OptimizedToolSelection;
