import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
} from "../../../services/studentService";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  university: "",
  degree: "",
  academicYear: "",
  gpa: "",
  bio: "",
  github: "",
  linkedin: "",
  portfolio: "",
  careerObjective: "",
  education: [],
  projects: [],
  skills: [],
  languages: [],
};

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [skill, setSkill] = useState("");

const [language, setLanguage] = useState("");





const [educationData, setEducationData] = useState({
  institute: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
  grade: "",
});

const [projectData, setProjectData] = useState({
  title: "",
  description: "",
  github: "",
});

const [level, setLevel] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender || "",
        university: data.university || "",
        degree: data.degree || "",
        academicYear: data.academicYear || "",
        gpa: data.gpa || "",
        bio: data.bio || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        portfolio: data.portfolio || "",
        careerObjective:
data.careerObjective || "",



education: data.education || [],

projects: data.projects || [],

skills:
data.skills || [],

        languages: (data.languages || []).map((item) =>
          typeof item === "string"
            ? { name: item, level: "" }
            : item
        ),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };




  const addSkill = () => {

  if (!skill.trim()) return;

  setFormData({

    ...formData,

    skills: [...formData.skills, skill],

  });

  setSkill("");

};

const removeSkill = (index) => {

  const list = [...formData.skills];

  list.splice(index, 1);

  setFormData({

    ...formData,

    skills: list,

  });

};





const addLanguage = () => {

  if (!language || !level) return;

  setFormData({

    ...formData,

    languages: [

      ...formData.languages,

      {

        name: language,

        level,

      },

    ],

  });

  setLanguage("");

  setLevel("");

};

const removeLanguage = (index) => {

  const list = [...formData.languages];

  list.splice(index, 1);

  setFormData({

    ...formData,

    languages: list,

  });

};

const addEducation = () => {

  if (
    !educationData.institute ||
    !educationData.degree
  )
    return;

  setFormData({

    ...formData,

    education: [

      ...formData.education,

      educationData,

    ],

  });

  setEducationData({

    institute: "",

    degree: "",

    field: "",

    startYear: "",

    endYear: "",

    grade: "",

  });

};

const removeEducation = (index) => {

  const list = [...formData.education];

  list.splice(index, 1);

  setFormData({

    ...formData,

    education: list,

  });

};



const addProject = () => {

  if (!projectData.title) return;

  setFormData({

    ...formData,

    projects: [

      ...formData.projects,

      projectData,

    ],

  });

  setProjectData({

    title: "",

    description: "",

    github: "",

  });

};

const removeProject = (index) => {

  const list = [...formData.projects];

  list.splice(index, 1);

  setFormData({

    ...formData,

    projects: list,

  });

};





  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(formData);

      alert("Profile Updated Successfully");

      window.dispatchEvent(new Event("student-profile-updated"));

      navigate("/student/profile/StudentProfile");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <form
      onSubmit={saveProfile}
      className="space-y-8"
    >
      {/* PERSONAL INFO */}

      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-8">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              <option value="">
                Select Gender
              </option>

              <option>Male</option>

              <option>Female</option>

            </select>

          </div>

          <div>

            <label className="block mb-2">
              University
            </label>

            <input
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Degree
            </label>

            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Academic Year
            </label>

            <input
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              GPA
            </label>

            <input
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

        </div>

      </div>

      {/* ABOUT */}

      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-5">
          About Me
        </h2>

        <textarea
          rows="6"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border rounded-lg p-4"
        />

      </div>

      {/* SOCIAL */}

      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-5">
          Social Links
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="Portfolio URL"
            className="w-full border rounded-lg p-3"
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

<h2 className="text-2xl font-bold mb-5">

Career Objective

</h2>

<textarea

rows={6}

name="careerObjective"

value={formData.careerObjective}

onChange={handleChange}

className="w-full border rounded-lg p-4"

placeholder="Describe your career goals..."

/>

</div>




<div className="bg-white rounded-xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Skills

</h2>

<div className="flex gap-3">

<input

type="text"

value={skill}

onChange={(e)=>setSkill(e.target.value)}

placeholder="React"

className="flex-1 border rounded-lg p-3"

/>

<button

type="button"

onClick={addSkill}

className="bg-blue-600 text-white px-6 rounded-lg"

>

Add

</button>

</div>

<div className="flex flex-wrap gap-3 mt-6">

{formData.skills.map((item,index)=>(

<div

key={index}

className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full flex items-center gap-3"

>

{item}

<button

type="button"

onClick={()=>removeSkill(index)}

className="text-red-600 font-bold"

>

×

</button>

</div>

))}

</div>

</div>






<div className="bg-white rounded-xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

Languages

</h2>

<div className="grid md:grid-cols-3 gap-3">

<input

value={language}

onChange={(e)=>setLanguage(e.target.value)}

placeholder="English"

className="border rounded-lg p-3"

/>

<select

value={level}

onChange={(e)=>setLevel(e.target.value)}

className="border rounded-lg p-3"

>

<option value="">

Select Level

</option>

<option>

Basic

</option>

<option>

Intermediate

</option>

<option>

Advanced

</option>

<option>

Native

</option>

</select>

<button

type="button"

onClick={addLanguage}

className="bg-blue-600 text-white rounded-lg"

>

Add

</button>

</div>

<div className="space-y-3 mt-6">

{formData.languages.map((item,index)=>(

<div

key={index}

className="border rounded-lg p-4 flex justify-between items-center"

>

<div>

<h3 className="font-semibold">

{item.name}

</h3>

<p className="text-gray-500">

{item.level}

</p>

</div>

<button

type="button"

onClick={()=>removeLanguage(index)}

className="text-red-600"

>

Remove

</button>

</div>

))}

</div>










<div className="bg-white rounded-xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

Education

</h2>

<div className="grid md:grid-cols-2 gap-4">

<input

placeholder="Institute"

value={educationData.institute}

onChange={(e)=>

setEducationData({

...educationData,

institute:e.target.value

})

}

className="border rounded-lg p-3"

/>

<input

placeholder="Degree"

value={educationData.degree}

onChange={(e)=>

setEducationData({

...educationData,

degree:e.target.value

})

}

className="border rounded-lg p-3"

/>

<input

placeholder="Field"

value={educationData.field}

onChange={(e)=>

setEducationData({

...educationData,

field:e.target.value

})

}

className="border rounded-lg p-3"

/>

<input

placeholder="Start Year"

value={educationData.startYear}

onChange={(e)=>

setEducationData({

...educationData,

startYear:e.target.value

})

}

className="border rounded-lg p-3"

/>

<input

placeholder="End Year"

value={educationData.endYear}

onChange={(e)=>

setEducationData({

...educationData,

endYear:e.target.value

})

}

className="border rounded-lg p-3"

/>

<input

placeholder="GPA"

value={educationData.grade}

onChange={(e)=>

setEducationData({

...educationData,

grade:e.target.value

})

}

className="border rounded-lg p-3"

/>

</div>

<button

type="button"

onClick={addEducation}

className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"

>

Add Education

</button>

<div className="mt-6 space-y-4">

{

formData.education.map((edu,index)=>(

<div

key={index}

className="border rounded-xl p-5"

>

<div className="flex justify-between">

<div>

<h3 className="font-bold">

{edu.degree}

</h3>

<p>

{edu.institute}

</p>

<p>

{edu.field}

</p>

</div>

<button

type="button"

onClick={()=>removeEducation(index)}

className="text-red-600"

>

Delete

</button>

</div>

</div>

))

}

</div>

</div>


<div className="bg-white rounded-xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

Projects

</h2>

<input

placeholder="Project Title"

value={projectData.title}

onChange={(e)=>

setProjectData({

...projectData,

title:e.target.value

})

}

className="border rounded-lg p-3 w-full mb-4"

/>

<textarea

rows="5"

placeholder="Project Description"

value={projectData.description}

onChange={(e)=>

setProjectData({

...projectData,

description:e.target.value

})

}

className="border rounded-lg p-3 w-full mb-4"

/>

<input

placeholder="GitHub Link"

value={projectData.github}

onChange={(e)=>

setProjectData({

...projectData,

github:e.target.value

})

}

className="border rounded-lg p-3 w-full"

/>

<button

type="button"

onClick={addProject}

className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"

>

Add Project

</button>

<div className="space-y-5 mt-6">

{

formData.projects.map((project,index)=>(

<div

key={index}

className="border rounded-xl p-5"

>

<div className="flex justify-between">

<div>

<h3 className="font-bold text-lg">

{project.title}

</h3>

<p className="mt-2">

{project.description}

</p>

<a

href={project.github}

target="_blank"

rel="noreferrer"

className="text-blue-600"

>

{project.github}

</a>

</div>

<button

type="button"

onClick={()=>removeProject(index)}

className="text-red-600"

>

Delete

</button>

</div>

</div>

))

}

</div>

</div>






</div>




      {/* BUTTON */}

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => navigate("/student/profile/StudentProfile")}
          disabled={saving}
          className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

      </div>

    </form>
  );
}

export default EditProfile;
