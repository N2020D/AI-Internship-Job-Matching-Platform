const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        
    },
     role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },






phone: {
    type: String,
    default: "",
},

university: {
    type: String,
    default: "",
},

degree: {
    type: String,
    default: "",
},

academicYear: {
    type: String,
    default: "",
},

gpa: {
    type: String,
    default: "",
},

bio: {
    type: String,
    default: "",
},

dateOfBirth: {
    type: Date,
},

gender: {
    type: String,
    default: "",
},

profileImage: {
    type: String,
    default: "",
},

address: {
    type: String,
    default: "",
},

careerObjective: {
    type: String,
    default: "",
},

education: [
    {
        institute: String,
        degree: String,
        field: String,
        startYear: String,
        endYear: String,
        grade: String,
    }
],

experience: [
    {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
    }
],

projects: [
    {
        title: String,
        description: String,
        github: String,
    }
],

linkedin: {
    type: String,
    default: "",
},

github: {
    type: String,
    default: "",
},

portfolio: {
    type: String,
    default: "",
},

resume: {
    type: String,
    default: "",
},





skills: [{
    type: String,
}],

languages: [
    {
        name: String,
        level: String,
    }
]
  },
{ 
    timestamps: true ,
    });
module.exports = mongoose.model('User', userSchema);
