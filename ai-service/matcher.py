from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from skill_extractor import extract_skills
from utils import clean_text


ROLE_SKILLS = {

    "Frontend Developer": [
        "html",
        "css",
        "javascript",
        "react",
        "tailwind",
        "bootstrap",
        "typescript"
    ],

    "Backend Developer": [
        "node",
        "express",
        "mongodb",
        "mysql",
        "sql",
        "api",
        "django",
        "flask"
    ],

    "Full Stack Developer": [
        "react",
        "node",
        "express",
        "mongodb",
        "javascript",
        "html",
        "css"
    ],

    "Software Engineer": [
        "java",
        "python",
        "c++",
        "oop",
        "git",
        "sql"
    ],

    "Data Analyst": [
        "python",
        "excel",
        "pandas",
        "numpy",
        "sql",
        "power bi"
    ],

    "Machine Learning Engineer": [
        "python",
        "tensorflow",
        "pytorch",
        "scikit",
        "machine learning",
        "numpy"
    ]

}


def recommend_roles(resume_skills):

    results = []

    for role, skills in ROLE_SKILLS.items():

        score = len(set(resume_skills) & set(skills))

        if score > 0:
            results.append(
                {
                    "role": role,
                    "score": score
                }
            )

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return [r["role"] for r in results[:5]]


def analyze_resume(resume_text, job_description):

    resume = clean_text(resume_text)

    job = clean_text(job_description)

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(
        [
            resume,
            job
        ]
    )

    similarity = cosine_similarity(vectors)[0][1]

    similarity = round(
        similarity * 100,
        2
    )

    resume_skills = extract_skills(resume)

    job_skills = extract_skills(job)

    matched = []

    missing = []

    for skill in job_skills:

        if skill in resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    if len(job_skills) == 0:
        skill_score = 0
    else:
        skill_score = round(
            (
                len(matched)
                /
                len(job_skills)
            ) * 100,
            2
        )

    final_score = round(
        similarity * 0.4 +
        skill_score * 0.6,
        2
    )

    recommended_roles = recommend_roles(
        resume_skills
    )

    return {

        "ats_score": final_score,

        "similarity": similarity,

        "skill_score": skill_score,

        "matched_skills": matched,

        "missing_skills": missing,

        "resume_skills": resume_skills,

        "recommended_roles": recommended_roles

    }