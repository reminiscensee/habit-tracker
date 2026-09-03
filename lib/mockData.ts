import { Prisma } from "@prisma/client";

export type HabitWithLogs = Prisma.HabitGetPayload<{
  include: { logs: true };
}>;

const DAY_IN_MS = 86400000;
const now = Date.now();

export const mockHabits: HabitWithLogs[] = [
  {
    id: "demo-habit-1",
    userId: "demo-user",
    name: "Drink 2L of water 💧",
    logs: [
      {
        id: "demo-log-1",
        habitId: "demo-habit-1",
        createdAt: new Date(now), // Today
      },
      {
        id: "demo-log-2",
        habitId: "demo-habit-1",
        createdAt: new Date(now - DAY_IN_MS * 1), // Yesterday
      },
      {
        id: "demo-log-3",
        habitId: "demo-habit-1",
        createdAt: new Date(now - DAY_IN_MS * 2), // 2 days ago (Streak: 3)
      },
    ],
  },
  {
    id: "demo-habit-2",
    userId: "demo-user",
    name: "Read 10 pages 📚",
    logs: [
      {
        id: "demo-log-4",
        habitId: "demo-habit-2",
        createdAt: new Date(now - DAY_IN_MS * 1), // Yesterday (Streak: 1)
      },
    ],
  },
];