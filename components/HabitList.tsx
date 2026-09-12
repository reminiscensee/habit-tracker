import { Prisma } from "@prisma/client"
import { markHabitDone, deleteHabit } from "@/actions"
import { calculateCurrentStreak, calculateLongestStreak } from "@/lib/streaks"
import { heatmap } from "@/lib/heatmap"
import { SubmitButton } from "./SubmitButton"
import { UpdateHabitForm } from "./UpdateHabitForm"

type HabitWithLogs = Prisma.HabitGetPayload<{
    include: { logs: true }
}>

export default function HabitList({ habits, isDemo }: { habits: HabitWithLogs[], isDemo: boolean }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {habits.map((habit) => {
                const currentStreak = calculateCurrentStreak(habit.logs);
                const longestStreak = calculateLongestStreak(habit.logs);
                const heatmapData = heatmap(habit.logs);

                return (
                    <div
                        className="flex flex-col p-4 bg-gray-900 text-gray-100 rounded-xl border border-gray-800 shadow-sm gap-3 sm:gap-4 overflow-hidden"
                        key={habit.id}
                    >
                        <div className="w-full">
                            <UpdateHabitForm isDemo={isDemo} habitId={habit.id} initialName={habit.name}/>
                        </div>

                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2 text-xs">
                                <div
                                    className="flex items-center gap-1.5 bg-gray-800/60 border border-gray-700/50 px-2.5 py-1.5 rounded-lg"
                                    title="Current Streak"
                                >
                                    <span className="text-gray-400 font-medium">Cur:</span>
                                    <span className="font-semibold text-orange-400">🔥 {currentStreak}</span>
                                </div>
                                <div
                                    className="flex items-center gap-1.5 bg-gray-800/60 border border-gray-700/50 px-2.5 py-1.5 rounded-lg"
                                    title="Longest Streak"
                                >
                                    <span className="text-gray-400 font-medium">Best:</span>
                                    <span className="font-semibold text-yellow-400">🏆 {longestStreak}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <form action={markHabitDone}>
                                    <input type="hidden" name="habitId" value={habit.id} />
                                    {isDemo ? (
                                        <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 block font-medium">
                                            Demo Mode
                                        </span>
                                    ) : (
                                        <SubmitButton
                                            className="px-3.5 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Done
                                        </SubmitButton>
                                    )}
                                </form>

                                <form action={deleteHabit}>
                                    <input type="hidden" name="habitId" value={habit.id} />
                                    <SubmitButton
                                        disabled={isDemo}
                                        className="px-3 py-1.5 text-xs font-medium text-red-400 border border-red-500/50 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-red-400 transition-all duration-150"
                                    >
                                        Delete
                                    </SubmitButton>
                                </form>
                            </div>
                        </div>

                        {/* 3. Heatmap */}
                        <div className="bg-gray-950/60 p-3 rounded-lg border border-gray-800/50 flex flex-col gap-2 mt-auto">
                            <div className="flex items-center justify-between text-xs text-gray-400 font-medium px-0.5">
                                <span>Last 90 days</span>
                            </div>

                            <div className="flex justify-start items-center overflow-x-auto">
                                <div className="grid grid-rows-7 grid-flow-col gap-1.5">
                                    {[...heatmapData].reverse().map((day) => (
                                        <div key={day.date} className={`w-3 h-3 rounded-sm hover:ring-1 hover:ring-white/50 transition-all cursor-pointer ${
                                                day.completed ?  "bg-emerald-500" : "bg-zinc-800"
                                            }`} title={`${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })} — ${day.completed ? 'Done' : 'Not done'}`}> 
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}