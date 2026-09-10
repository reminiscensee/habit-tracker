'use client'

import { updateHabit } from "@/actions";
import { useActionState } from "react";
import { SubmitButton } from "./SubmitButton";

interface UpdateHabitFormProps {
  isDemo: boolean;
  habitId: string;
  initialName: string;
}

export function UpdateHabitForm({ isDemo, habitId, initialName }: UpdateHabitFormProps) {
  const [state, formAction] = useActionState(updateHabit, { error: null });

  return (
    <form action={formAction} className="flex flex-col">
      <input type="hidden" name="habitId" value={habitId} />

      <div className="flex items-center gap-2">
        <input
          name="name"
          defaultValue={initialName}
          disabled={isDemo}
          className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-600 disabled:opacity-50 text-sm"
        />
        <SubmitButton
          disabled={isDemo}
          className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </SubmitButton>
      </div>

      {state.error && (
        <p className="text-red-500 text-xs mt-1">{state.error}</p>
      )}
    </form>
  );
}