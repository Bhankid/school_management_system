"use server";

import FeeGroup from "@/models/FeeGroup";
import Fee from "@/models/Fee";
import { revalidatePath } from "next/cache";

export async function addFeeGroup(formData: FormData): Promise<{ id: number }> {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const fees = JSON.parse(formData.get("fees") as string) as { type: string; amount: string }[];

    const feeGroup = await FeeGroup.create({ name, description });

    await Promise.all(
      fees.map((fee) =>
        Fee.create({
          type: fee.type,
          amount: fee.amount,
          feeGroupId: feeGroup.id,
        })
      )
    );

    revalidatePath("/account");

    return { id: feeGroup.id };
  } catch (error) {
    console.error("Failed to add fee group:", error);
    throw new Error("Failed to add fee group");
  }
}

interface FeeGroupData {
  id: number;
  name: string;
  description: string;
  fees: { type: string; amount: string }[];
}

export async function getAllFeeGroups(): Promise<FeeGroupData[]> {
  try {
    const feeGroups = await FeeGroup.findAll({
      include: [
        {
          model: Fee,
          as: "Fees",
          attributes: ["type", "amount"],
        },
      ],
      order: [["id", "DESC"]],
    });

    return feeGroups.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description || '',
      fees: group.Fees?.map((fee) => ({ type: fee.type, amount: fee.amount })) || [],
    }));
  } catch (error) {
    console.error("Failed to fetch fee groups:", error);
    throw new Error("Failed to fetch fee groups");
  }
}