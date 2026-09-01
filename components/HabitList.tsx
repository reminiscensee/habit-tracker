import { Habit } from "@prisma/client"
import { markHabitDone } from "@/actions"

export default function HabitList({ habits }: { habits: Habit[] }) {
    return (
        <div className="flex flex-col gap-3">
            {habits.map((habit) => (
                <div
                    className="p-4 bg-gray-900 text-gray-100 rounded-lg border border-gray-800 shadow-sm"
                    key={habit.id}>
                    {habit.name}
                    <form action={markHabitDone}>
                        <input
                            type="hidden"
                            name="habitId"
                            value={habit.id}
                        />
                        <button
                            type="submit"
                            className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition colors"
                        >
                            Done
                        </button>
                    </form>
                </div>
            ))}
        </div>
    )
}