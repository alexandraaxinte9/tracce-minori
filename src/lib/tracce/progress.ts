export function pathProgress(activeStopIndex: number, phraseCount: number): number {
	if (activeStopIndex <= 0 || phraseCount === 0) return 0;
	return Math.min(activeStopIndex / phraseCount, 1);
}

export function stopCount(phraseCount: number): number {
	return 1 + phraseCount;
}
