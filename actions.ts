'use server'

import { signIn, signOut } from '@/app/auth'
export async function signInWithGoogle() {
  await signIn('google')
}
export async function signOutBtn() {
  await signOut()
}