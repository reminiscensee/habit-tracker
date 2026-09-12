'use client'
import { useState } from "react"

interface HabitHeatmapProps {
    heatmapData: { date: string; completed: boolean }[];
}

export function HabitHeatmap({ heatmapData }: HabitHeatmapProps) {
    const [isHeatmapVisible, setIsHeatmapVisible] = useState(true)

    return (
        <div className="bg-gray-950/60 p-3 rounded-lg border border-gray-800/50 flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium px-0.5">
                <span>Last 90 days</span>
                <button
                    onClick={() => setIsHeatmapVisible((prev) => !prev)}
                    className="px-2 py-0.5 text-xs font-medium text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-800 border border-gray-700/60 rounded-md transition-all cursor-pointer"
                >
                    {isHeatmapVisible ? 'Hide' : 'Show'}
                </button>
            </div>

            {isHeatmapVisible && (<div className="flex justify-start items-center overflow-x-auto">
                <div className="grid grid-rows-7 grid-flow-col gap-1.5">
                    {[...heatmapData].reverse().map((day) => (
                        <div key={day.date} className={`w-3 h-3 rounded-sm hover:ring-1 hover:ring-white/50 transition-all cursor-pointer ${day.completed ? "bg-emerald-500" : "bg-zinc-800"
                            }`} title={`${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })} — ${day.completed ? 'Done' : 'Not done'}`}>
                        </div>
                    ))}
                </div>
            </div>)}
        </div>
    )
}