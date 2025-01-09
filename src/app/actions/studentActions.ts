"use server";

import Student from "@/models/Student";
import Parent from "@/models/Parent";
import { revalidatePath } from "next/cache";

export async function addStudent(formData: FormData): Promise<void> {
  try {
    const parentData = {
      fatherName: formData.get("fatherName") as string,
      motherName: formData.get("motherName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      fatherOccupation: formData.get("fatherOccupation") as string,
      address: formData.get("address") as string,
      religion: formData.get("parentReligion") as string,
    };

    const file = formData.get("photoUrl") as File;
    const photoUrl = file ? file.name : null;

    const studentData = {
      name: formData.get("name") as string,
      gender: formData.get("gender") as string,
      class: formData.get("class") as string,
      dateOfBirth: new Date(formData.get("dateOfBirth") as string),
      bloodGroup: formData.get("bloodGroup") as string,
      religion: formData.get("religion") as string,
      admissionDate: new Date(formData.get("admissionDate") as string),
      photoUrl: photoUrl,
    };

    const parent = await Parent.create(parentData);
    await Student.create({
      ...studentData,
      parentId: parent.id,
    });

    revalidatePath("/students");
  } catch (err) {
    console.error("Failed to add student:", err);
    throw new Error("Failed to add student");
  }
}
