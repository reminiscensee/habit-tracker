import { Prisma } from "@prisma/client";

export type HabitWithLogs = Prisma.HabitGetPayload<{
  include: { logs: true };
}>;

const DAY_IN_MS = 86400000;
const now = Date.now();

const createLog = (id: string, habitId: string, daysAgo: number) => ({
  id,
  habitId,
  createdAt: new Date(now - DAY_IN_MS * daysAgo),
});

export const mockHabits: HabitWithLogs[] = [
  {
    id: "demo-habit-1",
    userId: "demo-user",
    name: "Code & Build Projects 💻",
    logs: [
      0, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22, 24, 25, 27, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60
    ].map((days, idx) => createLog(`demo-log-1-${idx}`, "demo-habit-1", days)),
  },
  {
    id: "demo-habit-2",
    userId: "demo-user",
    name: "Drink 2.5L Water 💧",
    logs: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 32, 33, 35, 40
    ].map((days, idx) => createLog(`demo-log-2-${idx}`, "demo-habit-2", days)),
  },
  {
    id: "demo-habit-3",
    userId: "demo-user",
    name: "Mobility & Handstands 🤸",
    logs: [
      0, 1, 2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 18, 20, 21, 24, 27, 30, 33, 36, 40, 45, 48
    ].map((days, idx) => createLog(`demo-log-3-${idx}`, "demo-habit-3", days)),
  },
  {
    id: "demo-habit-4",
    userId: "demo-user",
    name: "Read Documentation & Books 📚",
    logs: [
      1, 2, 3, 5, 7, 8, 9, 10, 12, 14, 15, 17, 19, 20, 22, 25, 28, 30, 35, 40, 44, 50
    ].map((days, idx) => createLog(`demo-log-4-${idx}`, "demo-habit-4", days)),
  },
  {
    id: "demo-habit-5",
    userId: "demo-user",
    name: "Workout / Boxing Session 🥊",
    logs: [
      0, 2, 4, 7, 9, 11, 14, 16, 18, 21, 23, 25, 28, 30, 33, 35, 38, 42, 45, 49, 52
    ].map((days, idx) => createLog(`demo-log-5-${idx}`, "demo-habit-5", days)),
  },
];