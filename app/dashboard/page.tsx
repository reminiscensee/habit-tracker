import { auth } from "../auth"
import { signInWithGoogle, signOutBtn, createHabit } from "@/actions";
import HabitList from "@/components/HabitList";
import { prisma } from "@/lib/prisma";


export default async function Dashboard() {
    const session = await auth()
    const habits = await prisma.habit.findMany({
        where: {
            userId: session?.user?.id
        }
    })
    return (
        <div className="max-w-2xl mx-auto p-6 flex flex-col gap-8 mt-10">
            {session?.user ? (
                <>
                    <p>Hello, {session.user.name}</p>
                    <form action={signOutBtn}>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
                        >
                            Sign out
                        </button>
                    </form>
                    <form action={createHabit} className="flex gap-3">
                        <input
                            name="input"
                            type="text"
                            placeholder="Введіть назву звички..."
                            className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Add
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <form action={signInWithGoogle}>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
                        >
                            Sign in with Google
                        </button>
                    </form>
                </>
            )}
            <HabitList habits={habits} />
        </div>
    )
}