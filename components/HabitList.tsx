import { Prisma } from "@prisma/client"
import { markHabitDone, deleteHabit } from "@/actions"
import { calculateCurrentStreak, calculateLongestStreak } from "@/lib/streaks"

type HabitWithLogs = Prisma.HabitGetPayload<{
    include: { logs: true }
}>


export default function HabitList({ habits, isDemo }: { habits: HabitWithLogs[], isDemo: boolean }) {
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
                    <div className="flex items-center gap-2">
                        <form action={markHabitDone}>
                            <input
                                type="hidden"
                                name="habitId"
                                value={habit.id}
                            />
                            {isDemo ? (
                                <span className="text-xs text-gray-400 bg-gray-800 px-2.5 py-1 rounded border border-gray-700">
                                    Demo Mode
                                </span>
                            ) : (

                                <button
                                    type="submit"
                                    className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Done
                                </button>



                            )}
                        </form>
                        <form action={deleteHabit}>
                            <input type="hidden" name="habitId" value={habit.id} />
                            <button
                                type="submit"
                                disabled={isDemo}
                                className="px-3 py-1.5 text-xs text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >Delete</button>
                        </form>
                    </div>

                </div>
            ))}
        </div>
    )
}