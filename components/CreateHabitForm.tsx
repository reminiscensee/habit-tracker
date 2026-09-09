'use client'
import { useActionState } from "react"
import { createHabit } from "@/actions"
import { SubmitButton } from "./SubmitButton"


interface CreateHabitFormProps {
    isDemo: boolean;
}


export function CreateHabitForm({ isDemo }: CreateHabitFormProps) {
    const [state, formAction] = useActionState(createHabit, { error: null })

    return (
        <form action={formAction}>
            <div className="flex gap-3">
                <input
                    name="input"
                    type="text"
                    disabled={isDemo}
                    placeholder={isDemo ? "Sign in to add new habits..." : "Type habits name..."}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <SubmitButton
                    disabled={isDemo}
                    className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add
                </SubmitButton>
            </div>

            {state.error && (
                <p className="text-red-500 text-sm mt-2">{state.error}</p>
            )}
        </form>
    )
}