# **List collections:**

# users
    _id
    name
    email
    password
    role
    createdAt
# studentProfiles
    _id
    userId
    education
    skills
    experience
    resumeUrl
    careerGoals
# companies
    _id
    userId
    companyName
    industry
    description
    website
    logo
# jobs
    _id
    companyId
    title
    description
    requiredSkills
    location
    jobType
    salary
    deadline
# applications
    _id
    studentId
    jobId
    status
    appliedDate
    matchScore
# recommendations (optional)
    _id
    studentId
    jobId
    matchScore
    missingSkills
    recommendedCourses

