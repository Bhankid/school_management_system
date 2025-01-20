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

interface StudentWithParent extends Student {
  Parent?: {
    fatherName: string;
    motherName: string;
    address: string;
    phone: string;
  };
}

export async function getAllStudents() {
  try {
    const students = (await Student.findAll({
      include: [
        {
          model: Parent,
          as: "Parent",
          attributes: ["fatherName", "motherName", "address", "phone"],
        },
      ],
      attributes: ["id", "name", "gender", "class", "dateOfBirth"],
      order: [["createdAt", "DESC"]],
    })) as StudentWithParent[];

    const transformedStudents = students.map((student) => ({
      id: student.id,
      name: student.name,
      gender: student.gender,
      class: student.class,
      parents: `${student.Parent?.fatherName}, ${student.Parent?.motherName}`,
      address: student.Parent?.address,
      dateOfBirth: new Date(student.dateOfBirth).toISOString().split("T")[0],
      phone: student.Parent?.phone,
    }));

    return transformedStudents;
  } catch (err) {
    console.error("Failed to fetch students:", err);
    throw new Error("Failed to fetch students");
  }
}

export async function getStudentCount(): Promise<number> {
  try {
    const studentCount = await Student.count(); // Get the total count of students
    return studentCount;
  } catch (err) {
    console.error("Failed to fetch student count:", err);
    throw new Error("Failed to fetch student count");
  }
}