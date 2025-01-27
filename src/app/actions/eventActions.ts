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

// export async function editEvent(id: string, title: string, description: string, date: Date) {
//   try {
//     const event = await Event.findByPk(id);
//     if (!event) {
//       throw new Error("Event not found");
//     }

//     await event.update({
//       title,
//       description,
//       date,
//     });

//     // Convert to plain object and select only needed fields
//     const plainEvent = {
//       id: event.id,
//       title: event.title,
//       description: event.description,
//       date: new Date(event.date).toISOString().split('T')[0]
//     };

//     revalidatePath("/dashboard");
//     return { success: true, event: plainEvent };
//   } catch (error) {
//     console.error("Error editing event:", error);
//     throw new Error("Failed to edit event");
//   }
// }

// export async function deleteEvent(id: string) {
//   try {
//     const event = await Event.findByPk(id);
//     if (!event) {
//       throw new Error("Event not found");
//     }

//     await event.destroy();

//     revalidatePath("/dashboard");
//     return { success: true };
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     throw new Error("Failed to delete event");
//   }
// }

// export async function shareEvent(id: string) {
//   try {
//     const event = await Event.findByPk(id);
//     if (!event) {
//       throw new Error("Event not found");
//     }

//     // Convert to plain object and select only needed fields
//     const plainEvent = {
//       id: event.id,
//       title: event.title,
//       description: event.description,
//       date: new Date(event.date).toISOString().split('T')[0]
//     };

//     // Create a JSON file with the event data
//     const json = JSON.stringify(plainEvent);
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `event-${event.id}.json`;
//     a.click();

//     return { success: true };
//   } catch (error) {
//     console.error("Error sharing event:", error);
//     throw new Error("Failed to share event");
//   }
// }