import { Prisma } from "@prisma/client"
import HabitCard from "./HabitCard"

type HabitWithLogs = Prisma.HabitGetPayload<{
    include: { logs: true }
}>

export default function HabitList({ habits, isDemo }: { habits: HabitWithLogs[], isDemo: boolean }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full items-start">
            {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} isDemo={isDemo} />
            ))}
        </div>
    )
}