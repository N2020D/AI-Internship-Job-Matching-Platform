const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Freelance"],
        default: "Full-time",
    },
    salary: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            default: "USD",
        },
    },
    description: {
        type: String,
        required: true,
    },
    requirements: [{
        type: String,
    }],
    responsibilities: [{
        type: String,
    }],
    skills: [{
        type: String,
    }],
    experience: {
        type: String,
        default: "0 years",
    },
    education: {
        type: String,
        default: "Bachelor's Degree",
    },
    category: {
        type: String,
        enum: ["IT", "Finance", "Marketing", "Sales", "Operations", "HR", "Other"],
        default: "IT",
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    status: {
        type: String,
        enum: ["Open", "Closed", "On Hold"],
        default: "Open",
    },
    deadline: {
        type: Date,
    },
    views: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);
