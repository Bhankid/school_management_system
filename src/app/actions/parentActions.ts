"use server";

import Parent from "@/models/Parent";

export async function getAllParents() {
  try {
    const parents = await Parent.findAll({
      order: [["createdAt", "DESC"]],
    });

    const serializedParents = parents.map((parent) => ({
      id: parent.id,
      fatherName: parent.fatherName,
      motherName: parent.motherName,
      email: parent.email,
      phone: parent.phone,
      fatherOccupation: parent.fatherOccupation,
      address: parent.address,
      religion: parent.religion,
    }));

    return serializedParents;
  } catch (err) {
    console.error("Failed to fetch parents:", err);
    throw new Error("Failed to fetch parents");
  }
}

export async function getParentCount(): Promise<number> {
  try {
    const count = await Parent.count(); // Sequelize `count` method to get the total rows
    return count;
  } catch (err) {
    console.error("Failed to fetch parent count:", err);
    throw new Error(`Failed to fetch parent count: ${err instanceof Error ? err.message : "Unknown error"}`);
  }
}
