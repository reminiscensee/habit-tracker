

export default function Loading() {
    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="h-6 w-48 bg-zinc-800 rounded-md" />
                <div className="h-8 w-20 bg-zinc-800 rounded-md" />
            </div>

            <div className="flex gap-2">
                <div className="h-10 flex-1 bg-zinc-800 rounded-md" />
                <div className="h-10 w-20 bg-zinc-800 rounded-md" />
            </div>

            <div className="space-y-4 pt-4 animate-pulse">
                {[1, 2].map((item) => (
                    <div key={item} className="h-44 bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
                        <div className="h-8 w-1/3 bg-zinc-800 rounded-md" />
                        <div className="h-20 bg-zinc-800/50 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
}