import { signInWithGoogle } from "@/actions";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <form action={signInWithGoogle}>
        <button 
          type="submit" 
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}