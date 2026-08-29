import { auth } from "../auth"
import { signInWithGoogle } from "@/actions";

export default async function Dashboard() {
    const session = await auth()
    return (
        <div>
            {session?.user ? (
                <>
                    <p>Hello, {session.user.name}</p>
                    {<form action={signInWithGoogle}>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
                        >
                            Sign in with Google
                        </button>
                    </form>}
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
        </div>
    )
}