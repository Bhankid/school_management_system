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

  classes.forEach((className) => {
    timetable[className] = {};
    daysOfWeek.forEach((day) => {
      const daySchedule: TimeSlot[] = [];
      const currentTime = new Date("1970-01-01T07:30:00");
      const subjectPool = [...subjects];

      // Add fixed activities
      fixedActivities.forEach((activity) => {
        const duration = timeDurations[activity];
        const startTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        currentTime.setMinutes(currentTime.getMinutes() + duration);
        const endTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        daySchedule.push({ startTime, endTime, activity });
      });

      // Add lessons based on subject occurrences
      for (let i = 1; i <= 6; i++) {
        const availableSubjects = subjectPool.filter((s) => s.occurrences > 0);
        if (availableSubjects.length === 0) break;

        const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
        const duration = timeDurations[`Lesson ${i}`] || 45;

        const startTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        currentTime.setMinutes(currentTime.getMinutes() + duration);
        const endTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        daySchedule.push({
          startTime,
          endTime,
          activity: `${subject.subject} (${subject.teacher})`,
        });

        subject.occurrences -= 1;
      }

      timetable[className][day] = daySchedule;
    });
  });

  return timetable;
};
