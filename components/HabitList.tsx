import { Prisma } from "@prisma/client"
import { markHabitDone } from "@/actions"
import { calculateCurrentStreak, calculateLongestStreak } from "@/lib/streaks"

type HabitWithLogs = Prisma.HabitGetPayload<{
    include: { logs: true }
}>

export default function HabitList({ habits }: { habits: HabitWithLogs[] }) {
    return (
        <div className="flex flex-col gap-3">
            {habits.map((habit) => (
                <div
                    className="flex items-center justify-between p-4 bg-gray-900 text-gray-100 rounded-lg border border-gray-800 shadow-sm"
                    key={habit.id}
                >
                    <span className="font-medium">
                        {habit.name} 🔥 {calculateCurrentStreak(habit.logs)}
                    </span>
                    <span>
                        {calculateLongestStreak(habit.logs)} 🔥
                    </span>

                    <form action={markHabitDone}>
                        <input
                            type="hidden"
                            name="habitId"
                            value={habit.id}
                        />
                        <button
                            type="submit"
                            className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Done
                        </button>
                    </form>
                </div>
            ))}
        </div>
    )
}