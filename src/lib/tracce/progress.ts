export function smoothstep(t: number): number {
	const x = Math.max(0, Math.min(1, t));
	return x * x * (3 - 2 * x);
}

export function pathProgress(activeStopIndex: number, phraseCount: number): number {
	if (activeStopIndex <= 0 || phraseCount === 0) return 0;
	return Math.min(activeStopIndex / phraseCount, 1);
}

/** Progresso continuo del percorso in base alla posizione di scroll tra le fermate. */
export function scrollPathProgress(
	scrollCenterY: number,
	stopCentersY: number[],
	phraseCount: number
): number {
	if (phraseCount === 0 || stopCentersY.length < 2) return 0;

	const titoloCenter = stopCentersY[0];
	const firstFraseCenter = stopCentersY[1];
	const lastFraseCenter = stopCentersY[phraseCount];

	if (scrollCenterY <= titoloCenter) return 0;

	if (scrollCenterY < firstFraseCenter) {
		const t = (scrollCenterY - titoloCenter) / (firstFraseCenter - titoloCenter);
		return smoothstep(t) / phraseCount;
	}

	if (scrollCenterY >= lastFraseCenter) return 1;

	for (let i = 1; i < phraseCount; i++) {
		const start = stopCentersY[i];
		const end = stopCentersY[i + 1];
		if (scrollCenterY >= start && scrollCenterY < end) {
			const t = (scrollCenterY - start) / (end - start);
			return (i + t) / phraseCount;
		}
	}

	return 1;
}

export function stopCount(phraseCount: number): number {
	return 1 + phraseCount;
}
