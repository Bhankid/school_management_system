"use server";

import Teacher from "@/models/Teacher";
import { revalidatePath } from "next/cache";

export async function addTeacher(formData: FormData): Promise<void> {
  try {
    const file = formData.get("photoUrl") as File;
    const photoUrl = file ? file.name : undefined;

    const teacherData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      gender: formData.get("gender") as string,
      dateOfBirth: new Date(formData.get("dateOfBirth") as string),
      bloodGroup: formData.get("bloodGroup") as string,
      religion: formData.get("religion") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      class: formData.get("class") as string,
      address: formData.get("address") as string,
      admissionDate: new Date(formData.get("admissionDate") as string),
      photoUrl: photoUrl,
    };

    await Teacher.create(teacherData);
    revalidatePath("/teachers");
  } catch (err) {
    console.error("Failed to add teacher:", err);
    throw new Error(`Failed to add teacher: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

export async function getAllTeachers() {
  try {
    const teachers = await Teacher.findAll({
      order: [["id", "DESC"]],
      raw: true
    });

    return teachers.map((teacher) => ({
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      gender: teacher.gender,
      dateOfBirth: teacher.dateOfBirth ? new Date(teacher.dateOfBirth).toISOString().split("T")[0] : null,
      bloodGroup: teacher.bloodGroup,
      religion: teacher.religion,
      email: teacher.email || "N/A",
      phone: teacher.phone || "N/A",
      class: teacher.class,
      address: teacher.address,
      admissionDate: teacher.admissionDate ? new Date(teacher.admissionDate).toISOString().split("T")[0] : null,
      photoUrl: teacher.photoUrl || null,
    }));
  } catch (err) {
    console.error("Failed to fetch teachers:", err);
    throw new Error(`Failed to fetch teachers: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

export async function getTeacherCount(): Promise<number> {
  try {
    const count = await Teacher.count();
    return count;
  } catch (err) {
    console.error("Failed to fetch teacher count:", err);
    throw new Error(`Failed to fetch teacher count: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}