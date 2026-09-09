import { auth } from "./auth";
import { signInWithGoogle, signOutBtn } from "@/actions";
import HabitList from "@/components/HabitList";
import { mockHabits } from "@/lib/mockData";
import { prisma } from "@/lib/prisma";
import { SubmitButton } from "@/components/SubmitButton";
import { CreateHabitForm } from "@/components/CreateHabitForm";

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
          <p>Hello,  {session.user.name}</p>
          {session.user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name || "User avatar"}
              referrerPolicy="no-referrer"
              className="w-15 h-15 rounded-full object-cover border border-gray-800"
            />
          )}
          <form action={signOutBtn}>
            <SubmitButton
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
            >
              Sign out
            </SubmitButton>
          </form>
        </div>
      ) : (
        <form action={signInWithGoogle}>
          <SubmitButton
            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
          >
            Sign in with Google
          </SubmitButton>
        </form>
      )}

      <CreateHabitForm isDemo={isDemo}></CreateHabitForm>

      <HabitList habits={habits} isDemo={isDemo} />
    </div>
  )
}