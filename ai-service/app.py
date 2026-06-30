from flask import Flask
from flask import request
from flask import jsonify

import os

from resume_parser import extract_resume_text
from matcher import analyze_resume

app = Flask(__name__)

UPLOAD_FOLDER = "uploads/resumes"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")

def home():

    return jsonify({

        "message": "AI Resume Analyzer Running"

    })


@app.route("/analyze", methods=["POST"])

def analyze():

    if "resume" not in request.files:

        return jsonify({

            "message": "Resume not uploaded"

        }), 400

    resume = request.files["resume"]

    job_description = request.form.get(

        "job_description",

        ""

    )

    filepath = os.path.join(

        UPLOAD_FOLDER,

        resume.filename

    )

    resume.save(filepath)

    resume_text = extract_resume_text(filepath)

    result = analyze_resume(

        resume_text,

        job_description

    )

    return jsonify(result)


if __name__ == "__main__":

    app.run(

        debug=True,

        port=8000

    )

    