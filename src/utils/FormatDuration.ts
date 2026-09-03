export function formatDuration(seconds: number): string {
    const totalSeconds = Math.floor(seconds);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const minsStr = mins.toString().padStart(2, "0");
    const secsStr = secs.toString().padStart(2, "0");

    if (hrs > 0) {
        return `${hrs}:${minsStr}:${secsStr}`;
    }
    return `${minsStr}:${secsStr}`;
}
