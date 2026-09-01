export function calculateCurrentStreak(logs: { createdAt: Date }[]) {
    if (!logs || logs.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDate = new Date(logs[0].createdAt);
    firstDate.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (firstDate.getTime() < yesterday.getTime()) return 0;

    let currentStreak = 0;
    const expectedDate = new Date(firstDate);

    for (let i = 0; i < logs.length; i++) {
        const logDate = new Date(logs[i].createdAt);
        logDate.setHours(0, 0, 0, 0);

        if (logDate.getTime() === expectedDate.getTime()) {
            currentStreak++;
            expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
            break;
        }
    }

    return currentStreak; 
}