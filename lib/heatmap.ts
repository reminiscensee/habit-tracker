

export function heatmap(
    logs: { createdAt: Date }[],
    daysCount: number = 90
) {
    const completedDates = new Set(
        logs.map((log) => log.createdAt.toISOString().split('T')[0])
    );

    const result: { date: string; completed: boolean }[] = []

    for (let i = 0; i < daysCount; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0]
        const completed = completedDates.has(dateString);
        result.push({date: dateString, completed: completed});
    }
    return result
}