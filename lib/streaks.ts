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
export function calculateLongestStreak(logs: { createdAt: Date }[]) {
    if (!logs || logs.length === 0) return 0;

    let currentStreak = 1
    let maxStreak = 1

    for(let i = 1; i < logs.length; i++) {
        const streak = new Date(logs[i].createdAt);
        streak.setHours(0, 0, 0, 0);
        const previousStreak = new Date(logs[i - 1].createdAt);
        previousStreak.setHours(0, 0, 0, 0);

        if(previousStreak.getTime() - streak.getTime() === 86400000) {
            currentStreak++
            maxStreak = Math.max(maxStreak, currentStreak);
        } else {
            currentStreak = 1;
        }
    }
    return maxStreak;
}