"use server";

import Parent from "@/models/Parent";
import { Op } from "sequelize";

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

// Simple in-memory cache for the previous parent count
let cachedPreviousParentCount: number | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // Cache duration: 5 minutes

export async function getPreviousParentCount(): Promise<number> {
  try {
    // Check if the cached result is still valid
    const now = Date.now();
    if (cachedPreviousParentCount !== null && cacheTimestamp !== null && now - cacheTimestamp < CACHE_DURATION) {
      return cachedPreviousParentCount;
    }

    // Get the current date and the previous day's date
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1); // Subtract one day

    // Fetch the count of parents created before the previous day
    const previousParentCount = await Parent.count({
      where: {
        createdAt: {
          [Op.lt]: previousDate, // Less than the previous day
        },
      },
    });

    // Update the cache
    cachedPreviousParentCount = previousParentCount;
    cacheTimestamp = now;

    return previousParentCount;
  } catch (err) {
    console.error("Failed to fetch previous parent count:", err);
    throw new Error("Failed to fetch previous parent count");
  }
}
