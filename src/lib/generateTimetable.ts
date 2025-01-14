"use client";

export interface TimeSlot {
  startTime: string;
  endTime: string;
  activity: string;
}

export interface TimetableInput {
  classes: string[];
  subjects: { subject: string; teacher: string; occurrences: number }[];
  timeDurations: { [activity: string]: number };
}

export const generateTimetable = (input: TimetableInput) => {
  const { classes, subjects, timeDurations } = input;
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const fixedActivities = ["Break", "Lunch", "Assembly"];

  const timetable: Record<string, Record<string, TimeSlot[]>> = {};

  const generateDaySchedule = () => {
    const currentTime = new Date("1970-01-01T07:30:00");
    const daySchedule: TimeSlot[] = [];
    const subjectsSchedule = [...subjects];

    // Fixed Activities
    fixedActivities.forEach((activity) => {
      const duration = timeDurations[activity];
      const startTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      currentTime.setMinutes(currentTime.getMinutes() + duration);
      const endTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      daySchedule.push({ startTime, endTime, activity });
    });

    // Lesson Activities
    for (let i = 1; i <= 6; i++) {
      const subject = subjectsSchedule.shift()!;
      const duration = timeDurations[`Lesson ${i}`];
      const startTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      currentTime.setMinutes(currentTime.getMinutes() + duration);
      const endTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      daySchedule.push({
        startTime,
        endTime,
        activity: `${subject.subject} (${subject.teacher})`,
      });

      subjectsSchedule.push(subject); // Recycle subjects
    }

    return daySchedule;
  };

  classes.forEach((className) => {
    timetable[className] = {};
    daysOfWeek.forEach((day) => {
      timetable[className][day] = generateDaySchedule();
    });
  });

  return timetable;
};
