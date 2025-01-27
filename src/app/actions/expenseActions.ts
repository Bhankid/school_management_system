"use server";

import Expense, { ExpenseAttributes } from "@/models/Expense";
import { revalidatePath } from "next/cache";

export async function addExpense(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const expenseType = formData.get("expenseType") as string;
    const amount = formData.get("amount") as string;
    const status = formData.get("status") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const dueDate = formData.get("dueDate") as string | null;

    const expense = await Expense.create({
      name,
      expenseType,
      amount,
      status,
      email,
      phone,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    revalidatePath("/expenses");

    // Serialize the returned data to a plain object
    return {
      id: expense.id,
      name: expense.name,
      expenseType: expense.expenseType,
      amount: expense.amount,
      status: expense.status,
      email: expense.email,
      phone: expense.phone,
      dueDate: expense.dueDate ? expense.dueDate.toISOString().split("T")[0] : null,
    };
  } catch (error) {
    console.error("Failed to add expense:", error);
    throw new Error("Failed to add expense");
  }
}

export async function getAllExpenses(): Promise<ExpenseAttributes[]> {
  try {
    const expenses = await Expense.findAll({
      order: [["createdAt", "DESC"]],
    });

    // Convert Sequelize instances to plain objects
    return expenses.map(expense => expense.get({ plain: true }));
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    throw new Error("Failed to fetch expenses.");
  }
}

export async function deleteExpense(expenseId: number): Promise<void> {
  try {
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      throw new Error("Expense not found");
    }

    // Delete the expense
    await expense.destroy();

    revalidatePath("/expenses");
  } catch (err) {
    console.error("Failed to delete expense:", err);
    throw new Error("Failed to delete expense");
  }
}