import StudentFee from "@/models/StudentFee";
import { revalidatePath } from "next/cache";

export async function addFee(formData: FormData) {
  const name = formData.get("name") as string;
  const gender = formData.get("gender") as string;
  const classField = formData.get("class") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const status = formData.get("status") as string;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const dueDate = formData.get("dueDate") as string | null;

  try {
    const newFee = await StudentFee.create({
      name,
      gender,
      class: classField,
      amount: amount.toString(),
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