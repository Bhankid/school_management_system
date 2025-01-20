"use server";

import Event from "@/models/Event";
import { revalidatePath } from "next/cache";

export async function addEvent(title: string, description: string, date: Date) {
  try {
    const newEvent = await Event.create({
      title,
      description,
      date,
    });

    // Convert to plain object and select only needed fields
    const plainEvent = {
      id: newEvent.id,
      title: newEvent.title,
      description: newEvent.description,
      date: new Date(newEvent.date).toISOString().split('T')[0]
    };

    revalidatePath("/dashboard");
    return { success: true, event: plainEvent };
  } catch (error) {
    console.error("Error adding event:", error);
    throw new Error("Failed to add event");
  }
}

export async function getAllEvents() {
  try {
    const events = await Event.findAll({
      order: [["date", "ASC"]],
      raw: true
    });

    return events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split("T")[0]
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}