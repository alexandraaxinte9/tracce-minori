export function parsePercorsoSvg(svg: string): { viewBox: string; pathD: string } {
	const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/i);
	const pathMatch = svg.match(/<path[^>]*\sd=["']([^"']+)["']/i);
	return {
		viewBox: viewBoxMatch?.[1] ?? '0 0 100 100',
		pathD: pathMatch?.[1] ?? ''
	};
}
