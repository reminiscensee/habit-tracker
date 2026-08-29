

export default function HabitList() {
    const habitArray = [{
        id: 1,
        title: 'test'
    }]
    return (
        <div className="flex flex-col gap-3">
            {habitArray.map((habit) => (
                <div
                    className="p-4 bg-gray-900 text-gray-100 rounded-lg border border-gray-800 shadow-sm"
                    key={habit.id}>
                    {habit.title}
                </div>
            ))}
        </div>
    )
}