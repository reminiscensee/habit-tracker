'use client'

import { Prisma } from "@prisma/client"
import { markHabitDone, deleteHabit } from "@/actions"
import { calculateCurrentStreak, calculateLongestStreak } from "@/lib/streaks"
import { heatmap } from "@/lib/heatmap"
import { SubmitButton } from "./SubmitButton"
import { UpdateHabitForm } from "./UpdateHabitForm"
import { HabitHeatmap } from "./HabitHeatmap"
import { useOptimistic } from "react"

type HabitWithLogs = Prisma.HabitGetPayload<{
    include: { logs: true }
}>
type HabitLog = HabitWithLogs["logs"][number]

export default function HabitCard({ habit, isDemo }: { habit: HabitWithLogs; isDemo: boolean }) {  
    const [optimisticLogs, addOptimisticLog] = useOptimistic(
        habit.logs,
        (currentLogs, newLog: HabitLog) => [...currentLogs, newLog]
    );
    const currentStreak = calculateCurrentStreak(optimisticLogs);
    const longestStreak = calculateLongestStreak(optimisticLogs);
    const heatmapData = heatmap(optimisticLogs)

    async function handleDone(formData: FormData) {
        addOptimisticLog({
            id: Math.random().toString(),
            habitId: habit.id,
            createdAt: new Date()
        })
        await markHabitDone(formData)
    }
   

    return (
        <div className="flex flex-col p-4 bg-gray-900 text-gray-100 rounded-xl border border-gray-800 shadow-sm gap-3 sm:gap-4 overflow-hidden h-fit">
            <div className="w-full">
                <UpdateHabitForm isDemo={isDemo} habitId={habit.id} initialName={habit.name} />
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
                    <form action={handleDone}>
                        <input type="hidden" name="habitId" value={habit.id} />
                        {isDemo ? (
                            <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 block font-medium">
                                Demo Mode
                            </span>
                        ) : (
                            <SubmitButton className="px-3.5 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">
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

            <HabitHeatmap heatmapData={heatmapData} />
        </div>
    )
}