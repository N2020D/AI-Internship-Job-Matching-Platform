const hasValue = (value) =>
  typeof value === "string" ? value.trim() !== "" : Boolean(value);

const completedFields = (profile, fields) =>
  fields.filter((field) => hasValue(profile?.[field])).length;

export const calculateProfileCompletion = (profile = {}) => {
  const personalFields = [
    "name",
    "email",
    "phone",
    "gender",
    "university",
    "degree",
    "academicYear",
    "gpa",
  ];

  const socialFields = ["github", "linkedin", "portfolio"];

  const personalProgress =
    (completedFields(profile, personalFields) / personalFields.length) * 25;

  const socialProgress =
    (completedFields(profile, socialFields) / socialFields.length) * 5;

  return Math.round(
    personalProgress +
      (hasValue(profile.bio) ? 10 : 0) +
      (hasValue(profile.careerObjective) ? 10 : 0) +
      (profile.education?.length ? 10 : 0) +
      (profile.languages?.length ? 10 : 0) +
      (profile.projects?.length ? 10 : 0) +
      (profile.skills?.length ? 10 : 0) +
      (hasValue(profile.resume) ? 10 : 0) +
      socialProgress
  );
};
