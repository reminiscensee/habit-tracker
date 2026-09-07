import { auth } from "./auth";
import { signInWithGoogle, signOutBtn, createHabit } from "@/actions";
import HabitList from "@/components/HabitList";
import { mockHabits } from "@/lib/mockData";
import { prisma } from "@/lib/prisma";

export default async function Home() {

  const session = await auth()
  const isDemo = !session?.user?.id;

  const habits = session?.user?.id
    ? await prisma.habit.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        logs: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
    : mockHabits

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-8 mt-10">
      {session?.user ? (
        <div className="flex items-center justify-between">
          <p>Hello, {session.user.name}</p>
          <form action={signOutBtn}>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
            >
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
          >
            Sign in with Google
          </button>
        </form>
      )}

      <form action={createHabit} className="flex gap-3">
        <input
          name="input"
          type="text"
          disabled={isDemo}
          placeholder={isDemo ? "Sign in to add new habits..." : "Type habits name..."}
          className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isDemo}
          className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </form>

      <HabitList habits={habits} isDemo={isDemo} />
    </div>
  )
}