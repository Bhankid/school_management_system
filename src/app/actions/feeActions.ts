"use server";

import StudentFee from "@/models/StudentFee";
import { revalidatePath } from "next/cache";
import { Op } from "sequelize"; 

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

export async function getAllFees() {
  try {
    const fees = await StudentFee.findAll({ order: [["id", "DESC"]] });
    return fees.map((fee) => ({
      id: fee.id,
      name: fee.name,
      gender: fee.gender,
      class: fee.class,
      amount: fee.amount,
      status: fee.status,
      email: fee.email || "",
      phone: fee.phone || "",
      dueDate: fee.dueDate ? fee.dueDate.toISOString().split("T")[0] : "",
    }));
  } catch (error) {
    console.error("Failed to fetch fees:", error);
    throw new Error("Failed to fetch fees");
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


export async function getPreviousTotalEarnings(): Promise<number> {
  try {
    // Get yesterday's start and end time
    const currentDate = new Date();
    const previousDateStart = new Date(currentDate);
    previousDateStart.setDate(currentDate.getDate() - 1);
    previousDateStart.setHours(0, 0, 0, 0); // Start of the previous day

    const previousDateEnd = new Date(previousDateStart);
    previousDateEnd.setHours(23, 59, 59, 999); // End of the previous day

    // Fetch the sum of `amount` for fees created only on the previous day
    const previousTotalEarnings = await StudentFee.sum("amount", {
      where: {
        createdAt: {
          [Op.between]: [previousDateStart, previousDateEnd], // Only previous day
        },
      },
    });

    return previousTotalEarnings || 0; // Return 0 if no data exists
  } catch (error) {
    console.error("Failed to fetch previous total earnings:", error);
    return 0; // Return 0 instead of throwing an error
  }
}

export async function deleteFee(feeId: number): Promise<void> {
  try {
    const fee = await StudentFee.findByPk(feeId);

    if (!fee) {
      throw new Error("Fee not found");
    }

    // Delete the fee
    await fee.destroy();

    revalidatePath("/fees");
  } catch (err) {
    console.error("Failed to delete fee:", err);
    throw new Error("Failed to delete fee");
  }
}