"use server";

import { revalidatePath } from "next/cache";
import StudentFee from "@/models/StudentFee";

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
        ? new Date(dueDateValue)
        : undefined,
    };

    const newFee = await StudentFee.create(feeData);
    revalidatePath("/fees");

    return { 
      success: true, 
      message: "Fee added successfully.",
      data: newFee
    };
  } catch (error) {
    console.error("Error in addFee:", error);
    throw new Error(`Failed to add fee: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getAllFees() {
  try {
    const fees = await StudentFee.findAll({
      order: [["id", "DESC"]],
      raw: true
    });

    return fees.map((fee) => ({
      id: fee.id,
      name: fee.name,
      gender: fee.gender,
      class: fee.class,
      amount: Number(fee.amount),
      status: fee.status,
      email: fee.email,
      phone: fee.phone,
      dueDate: fee.dueDate ? new Date(fee.dueDate).toISOString().split("T")[0] : null
    }));
  } catch (error) {
    console.error("Failed to fetch fees:", error);
    throw new Error(`Failed to fetch fees: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getTotalEarnings(): Promise<number> {
  try {
    const totalEarnings = await StudentFee.sum("amount"); // Sum the `amount` column
    return totalEarnings || 0; // Return 0 if no data exists
  } catch (error) {
    console.error("Failed to fetch total earnings:", error);
    throw new Error(`Failed to fetch total earnings: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}