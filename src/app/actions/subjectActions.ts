"use server";

import Subject from "@/models/Subject";
import { revalidatePath } from "next/cache";

export async function createSubject(formData: FormData): Promise<void> {
  try {
    const subjectData = {
      subjectName: formData.get("subjectName") as string,
      teacher: formData.get("teacher") as string,
      classes: formData.get("classes") as string,
      days: formData.get("days") as string,
    };

    await Subject.create(subjectData);
    revalidatePath("/subjects");
  } catch (err) {
    console.error("Failed to add subject:", err);
    throw new Error("Failed to add subject");
  }
}

export async function getAllSubjects() {
  try {
    const subjects = await Subject.findAll({
      order: [["createdAt", "DESC"]],
    });

    // Convert Sequelize models to plain JavaScript objects
    const plainSubjects = subjects.map((subject) => ({
      id: subject.id,
      subjectName: subject.subjectName,
      teacher: subject.teacher,
      classes: subject.classes,
      days: subject.days,
    }));

    return plainSubjects;
  } catch (err) {
    console.error("Failed to fetch subjects:", err);
    throw new Error("Failed to fetch subjects");
  }
}

export async function deleteSubject(id: number): Promise<void> {
  try {
    await Subject.destroy({ where: { id } });
    revalidatePath("/subjects");
  } catch (err) {
    console.error("Failed to delete subject:", err);
    throw new Error("Failed to delete subject");
  }
}

export async function updateSubject(id: number | undefined, formData: FormData): Promise<void> {
  if (id === undefined) {
    throw new Error("Subject ID is required");
  }

  try {
    const subjectData = {
      subjectName: formData.get("subjectName") as string,
      teacher: formData.get("teacher") as string,
      classes: formData.get("classes") as string,
      days: formData.get("days") as string,
    };

    await Subject.update(subjectData, { where: { id } });
  } catch (err) {
    console.error("Failed to update subject:", err);
    throw new Error("Failed to update subject");
  }
}