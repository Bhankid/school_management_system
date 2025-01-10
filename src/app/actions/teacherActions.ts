"use server";

import Teacher from "@/models/Teacher";
import { revalidatePath } from "next/cache";

export async function addTeacher(formData: FormData): Promise<void> {
  try {
    const file = formData.get("photoUrl") as File;
    const photoUrl = file ? file.name : null;

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
    throw new Error("Failed to add teacher");
  }
}
