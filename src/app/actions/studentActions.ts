"use server";

import Student from "@/models/Student";
import Parent from "@/models/Parent";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

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
    let photoUrl: string | null = null;

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

// Define a type for the transformed student data sent to the client
interface TransformedStudent {
  id: number;
  name: string;
  gender: string;
  class: string;
  parents: string;
  address: string | undefined;
  dateOfBirth: string; // Always as a string
  phone: string | undefined;
  photoUrl: string | null;
}

export async function getAllStudents(): Promise<TransformedStudent[]> {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Parent,
          as: "Parent",
          attributes: ["fatherName", "motherName", "address", "phone"],
        },
      ],
      attributes: ["id", "name", "gender", "class", "dateOfBirth", "photoUrl"],
      order: [["createdAt", "DESC"]],
    }) as StudentWithParent[];

    // Transform students for the client
    const transformedStudents: TransformedStudent[] = students.map((student) => ({
      id: student.id,
      name: student.name,
      gender: student.gender,
      class: student.class,
      parents: `${student.Parent?.fatherName || ""}, ${student.Parent?.motherName || ""}`,
      address: student.Parent?.address,
      dateOfBirth: student.dateOfBirth
        ? new Date(student.dateOfBirth).toISOString().split("T")[0]
        : "",
      phone: student.Parent?.phone,
      photoUrl: student.photoUrl || null,
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

// export async function getStudentPhoto(studentId: number) {
//   try {
//     const student = await Student.findByPk(studentId, {
//       attributes: ['photoUrl']
//     });
    
//     if (!student?.photoUrl) {
//       return null;
//     }

//     return student.photoUrl;
//   } catch (err) console.error("Failed to fetch student photo:", err);
//     throw new Error("Failed to fetch student photo");
//   }
// }