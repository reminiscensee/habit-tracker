

export default function HabitList() {
    const habitArray = [{
        id: 1,
        title: 'test'
    }]
    return (
        <div>
            {habitArray.map((habit) => (
                <div key={habit.id}>
                    {habit.title}
                </div>
            ))}
        </div>
    )
}