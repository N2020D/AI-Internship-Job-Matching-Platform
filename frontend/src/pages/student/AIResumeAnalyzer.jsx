import { useState, useRef } from "react";
import { analyzeResume } from "../../services/aiService";
import { saveAIAnalysis } from "../../services/studentService";
import {
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineArrowUpTray,
  HiOutlineXMark,
  HiCheckBadge,
} from "react-icons/hi2";

function AIResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a resume to analyze");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await analyzeResume(file, jobDesc);

      setResult(data);

      await saveAIAnalysis({
        atsScore: data.ats_score,
        resumeSkills: data.resume_skills,
        matchedSkills: data.matched_skills,
        missingSkills: data.missing_skills,
        recommendedRoles: data.recommended_roles,
      });

      window.dispatchEvent(
        new Event("student-profile-updated")
      );

    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setJobDesc("");
    setError("");
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-orange-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-blue-50";
    if (score >= 40) return "bg-yellow-50";
    return "bg-orange-50";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <HiOutlineSparkles className="text-3xl text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              AI Resume Analyzer
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Analyze your resume with AI-powered insights. Upload your resume and job description to get personalized recommendations and scoring.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            
            {/* Upload Resume Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <HiOutlineDocumentText className="text-2xl text-blue-600" />
                Upload Resume
              </h2>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:bg-blue-50 cursor-pointer transition-colors bg-blue-50"
              >
                <HiOutlineArrowUpTray className="text-4xl text-blue-600 mx-auto mb-3" />
                <p className="text-gray-700 font-medium mb-2">
                  {file ? file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-gray-500 text-sm">
                  PDF files only, up to 10MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setError("");
                }}
                className="hidden"
              />

              {file && (
                <div className="mt-4 flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <HiCheckBadge className="text-xl text-green-600" />
                    <span className="text-gray-700 font-medium text-sm">{file.name}</span>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <HiOutlineXMark className="text-xl" />
                  </button>
                </div>
              )}
            </div>

            {/* Job Description Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Job Description (Optional)
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Paste a job description to get skill gap analysis and match recommendations.
              </p>
              <textarea
                placeholder="Paste job description here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                rows={6}
              />
              <p className="text-gray-500 text-xs mt-2">
                Optional but recommended for better job matching
              </p>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="space-y-6">
            
            {/* CTA Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !file}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all transform hover:scale-105 ${
                loading || !file
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-600 to-blue-700 hover:shadow-lg active:scale-95"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Analyzing Resume...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <HiOutlineSparkles className="text-xl" />
                  Analyze Resume
                </span>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <HiOutlineExclamationCircle className="text-2xl text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Results Display */}
            {result && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Scores Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                    <HiCheckBadge className="text-2xl text-blue-600" />
                    Analysis Results
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* ATS Score */}
                    <div className={`${getScoreBgColor(result.ats_score)} rounded-xl p-6 border-2 border-transparent`}>
                      <p className="text-gray-600 text-sm font-medium mb-2">ATS Score</p>
                      <p className={`text-4xl font-bold ${getScoreColor(result.ats_score)}`}>
                        {result.ats_score}%
                      </p>
                      <p className="text-gray-500 text-xs mt-2">Resume optimization level</p>
                    </div>

                    {/* Similarity Score */}
                    <div className={`${getScoreBgColor(result.similarity)} rounded-xl p-6 border-2 border-transparent`}>
                      <p className="text-gray-600 text-sm font-medium mb-2">Job Match</p>
                      <p className={`text-4xl font-bold ${getScoreColor(result.similarity)}`}>
                        {result.similarity}%
                      </p>
                      <p className="text-gray-500 text-xs mt-2">Job description alignment</p>
                    </div>

                    {/* Skill Score */}
                    <div className={`${getScoreBgColor(result.skill_score)} rounded-xl p-6 border-2 border-transparent`}>
                      <p className="text-gray-600 text-sm font-medium mb-2">Skill Match</p>
                      <p className={`text-4xl font-bold ${getScoreColor(result.skill_score)}`}>
                        {result.skill_score}%
                      </p>
                      <p className="text-gray-500 text-xs mt-2">Required skills coverage</p>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-5">Your Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.resume_skills.length > 0 ? (
                      result.resume_skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills detected</p>
                    )}
                  </div>
                </div>

                {/* Matched Skills */}
                {result.matched_skills.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                      <HiOutlineCheckCircle className="text-xl text-green-600" />
                      Matched Skills ({result.matched_skills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.matched_skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {result.missing_skills.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                      <HiOutlineExclamationCircle className="text-xl text-orange-600" />
                      Skills to Develop ({result.missing_skills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          ○ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Roles */}
                {result.recommended_roles.length > 0 && (
                  <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                      <HiOutlineSparkles className="text-xl text-blue-600" />
                      Recommended Job Roles
                    </h3>
                    <div className="space-y-2">
                      {result.recommended_roles.map((role, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-white rounded-lg p-3 hover:bg-blue-50 transition-colors"
                        >
                          <HiCheckBadge className="text-xl text-blue-600 shrink-0" />
                          <span className="font-medium text-gray-800">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reset Button */}
                <button
                  onClick={removeFile}
                  className="w-full py-3 px-6 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Analyze Another Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIResumeAnalyzer;