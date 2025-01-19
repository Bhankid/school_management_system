"use server";

import { revalidatePath } from "next/cache";
import StudentFee from "@/models/StudentFee";

// Add Fee Function
export async function addFee(formData: FormData) {
  try {
    const dueDateValue = formData.get("dueDate") as string;

    const feeData = {
      name: formData.get("name") as string,
      gender: formData.get("gender") as string,
      class: formData.get("class") as string,
      amount: parseFloat(formData.get("amount") as string),
      status: formData.get("status") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      dueDate: dueDateValue && !isNaN(Date.parse(dueDateValue))
        ? new Date(dueDateValue) // Parse valid date
        : undefined, // Set to undefined if invalid or not provided
    };

    // Save the data in the database
    await StudentFee.create(feeData);

    // Revalidate relevant paths if necessary
    revalidatePath("/fees");

    return { success: true, message: "Fee added successfully." };
  } catch (error) {
    console.error("Error in addFee:", error);
    throw new Error("Failed to add fee.");
  }
}

// Get All Fees Function
export async function getAllFees() {
  try {
    const fees = await StudentFee.findAll({
      order: [["id", "DESC"]],
    });

    // Convert Sequelize instances to plain objects
    return fees.map((fee) => ({
      id: fee.id,
      name: fee.name || "N/A",
      gender: fee.gender || "N/A",
      class: fee.class || "N/A",
      amount: fee.amount || 0,
      status: fee.status || "N/A",
      email: fee.email || "N/A",
      phone: fee.phone || "N/A",
      dueDate: fee.dueDate ? fee.dueDate.toISOString().split("T")[0] : "N/A",
    }));
  } catch (error) {
    console.error("Failed to fetch fees:", error);
    throw new Error("Failed to fetch fees");
  }
}
