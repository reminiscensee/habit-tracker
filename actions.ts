'use server'
import { signIn, signOut, auth } from '@/app/auth'
import { prisma } from './lib/prisma'
import { revalidatePath } from 'next/cache'

export async function signInWithGoogle() {
  await signIn('google')
}
export async function signOutBtn() {
  await signOut()
}
export async function createHabit(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;

  const name = formData.get('input')?.toString();
  if (!name || !name.trim()) return;

  await prisma.habit.create({
    data: {
      name: name, 
      userId: session.user.id,
    },
  })
  revalidatePath('/dashboard');
}