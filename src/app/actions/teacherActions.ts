"use server";

import Teacher from "@/models/Teacher";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function addTeacher(formData: FormData): Promise<void> {
  try {
    const file = formData.get("photoUrl") as File;
    let photoUrl: string | undefined;

    if (file) {
      // Define the path where you want to save the image
      const uploadDir = path.join(process.cwd(), "public/uploads"); // Ensure this directory exists
      const filePath = path.join(uploadDir, file.name);

      // Create the uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save the file to the uploads directory
      const buffer = await file.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(buffer));

      // Set the photoUrl to the relative path
      photoUrl = `/uploads/${file.name}`; // Adjust the path as necessary
    }

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