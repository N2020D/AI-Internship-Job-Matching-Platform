from skills import SKILLS

from utils import clean_text


def extract_skills(text):

    text = clean_text(text)

    found = []

    for skill in SKILLS:

        if skill.lower() in text:

            found.append(skill)

    return sorted(list(set(found)))