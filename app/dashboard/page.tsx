import { auth } from "../auth"
import { signInWithGoogle, signOutBtn } from "@/actions";
import HabitList from "@/components/HabitList";

export default async function Dashboard() {
    const session = await auth()
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
                </>
            ) : (
                <>
                    {<form action={signInWithGoogle}>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
                        >
                            Sign in with Google
                        </button>
                    </form>}
                </>
            )}
            <HabitList />
        </div>
    )
}