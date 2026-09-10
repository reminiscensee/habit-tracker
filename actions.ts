'use server'
import { signIn, signOut, auth } from '@/app/auth'
import { prisma } from './lib/prisma'
import { revalidatePath } from 'next/cache'
import { habitNameSchema } from './lib/validations'

export async function signInWithGoogle() {
  await signIn('google')
}

export async function signOutBtn() {
  await signOut()
}

export async function createHabit(
  prevState: { error: string | null }, 
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const name = formData.get('input');
  const parsed = habitNameSchema.safeParse(name);
  if (!parsed.success) {
    return { error: "Invalid habit name" }; 
  }

  await prisma.habit.create({
    data: {
      name: parsed.data,
      userId: session.user.id,
    },
  });

  revalidatePath('/');
  return { error: null }; 
}

export async function markHabitDone(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;

  const habitId = formData.get('habitId')?.toString();
  if (!habitId) return;

  const existingHabit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: session.user.id,
    },
  });
  if (!existingHabit) return;


  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLog = await prisma.habitLog.findFirst({
    where: {
      habitId,
      createdAt: {
        gte: today
      },
    },
  });
  if (todayLog) return;
  await prisma.habitLog.create({
    data: {
      habitId,
    },
  });
  revalidatePath('/');
}

export async function deleteHabit(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;

  const habitId = formData.get('habitId')?.toString();
  if (!habitId) return;
  const selectedHabit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: session.user.id
    },
  });
  if (!selectedHabit) return;
  await prisma.habit.delete({
    where: {
      id: habitId
    }
  })
  revalidatePath('/');
}

export async function updateHabit(
  prevState: { error: string | null }, 
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const habitId = formData.get('habitId')?.toString();
  if (!habitId) {
  return { error: "Habit ID is missing" };
}

  const rawName = formData.get('name');
  const parsed = habitNameSchema.safeParse(rawName);

  if (!parsed.success) {
    return { error: "Invalid habit name" }; 
  }

  const selectedHabit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: session.user.id,
    },
  });
  if (!selectedHabit)  {
    return { error: "Habit not found" }
  }

  await prisma.habit.update({
    where: {
      id: habitId,
    },
    data: {
      name: parsed.data,
    },
  });
  revalidatePath('/');
  return { error: null };
}