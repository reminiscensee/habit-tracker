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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-8 mt-10">
      {session?.user ? (
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {session.user.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name || "User avatar"}
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-800 shrink-0"
              />
            )}
            <p className="text-xs sm:text-base text-gray-200 font-medium truncate">
              Hello, {session.user.name}
            </p>
          </div>
          
          <form action={signOutBtn} className="shrink-0">
            <SubmitButton
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-black text-white dark:bg-white dark:text-black rounded-md whitespace-nowrap"
            >
              Sign out
            </SubmitButton>
          </form>
        </div>
      ) : (
        <form action={signInWithGoogle}>
          <SubmitButton
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-black text-white dark:bg-white dark:text-black rounded-md"
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