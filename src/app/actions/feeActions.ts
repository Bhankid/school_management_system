"use server";

import StudentFee from "@/models/StudentFee";
import { revalidatePath } from "next/cache";

// Function to add a new fee
export async function addFee(formData: FormData) {
  const name = formData.get("name") as string;
  const gender = formData.get("gender") as string;
  const classField = formData.get("class") as string;
  const amount = formData.get("amount") as string;
  const status = formData.get("status") as string;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const dueDate = formData.get("dueDate") as string | null;

  try {
    const newFee = await StudentFee.create({
      name,
      gender,
      class: classField,
      amount: parseFloat(amount),
      status,
      email: email || undefined,
      phone: phone || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    revalidatePath("/fees");

    return {
      id: newFee.id,
      name: newFee.name,
      gender: newFee.gender,
      class: newFee.class,
      amount: newFee.amount,
      status: newFee.status,
      email: newFee.email || "",
      phone: newFee.phone || "",
      dueDate: newFee.dueDate ? newFee.dueDate.toISOString().split("T")[0] : null,
    };
  } catch (error) {
    console.error("Failed to add fee:", error);
    throw new Error("Failed to add fee");
  }
}

// Function to get all fees
export async function getAllFees() {
  try {
    const fees = await StudentFee.findAll({ order: [["id", "DESC"]] });
    return fees.map((fee) => ({
      id: fee.dataValues.id,
      name: fee.dataValues.name,
      gender: fee.dataValues.gender,
      class: fee.dataValues.class,
      amount: fee.dataValues.amount, 
      status: fee.dataValues.status,
      email: fee.dataValues.email || "",
      phone: fee.dataValues.phone || "",
      dueDate: fee.dataValues.dueDate ? fee.dataValues.dueDate.toISOString().split("T")[0] : null,
      createdAt: fee.dataValues.createdAt,
      updatedAt: fee.dataValues.updatedAt,
    }));
  } catch (error) {
    console.error("Failed to fetch fees:", error);
    throw new Error("Failed to fetch fees");
  }
}


// Function to get total earnings
export async function getTotalEarnings(): Promise<number> {
  try {
    const totalEarnings = await StudentFee.sum("amount"); // Sum the `amount` column
    return totalEarnings || 0; // Return 0 if no data exists
  } catch (error) {
    console.error("Failed to fetch total earnings:", error);
    throw new Error(`Failed to fetch total earnings: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}