import yaml from 'js-yaml';
import type { TracciaContent, TracciaSummary, Frase } from './types';

type YamlRoot = {
	titolo: string;
	frasi: Frase[];
};

const frasiModules = import.meta.glob('/src/lib/content/tracce/*/frasi.yaml', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const svgModules = import.meta.glob('/src/lib/content/tracce/*/percorso.svg', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

function slugFromPath(path: string): string {
	const match = path.match(/\/tracce\/(traccia-\d+)\//);
	if (!match) throw new Error(`Percorso non valido: ${path}`);
	return match[1];
}

function frasiPath(slug: string): string {
	return `/src/lib/content/tracce/${slug}/frasi.yaml`;
}

function svgPath(slug: string): string {
	return `/src/lib/content/tracce/${slug}/percorso.svg`;
}

function parseYaml(slug: string): YamlRoot {
	const raw = frasiModules[frasiPath(slug)];
	if (!raw) throw new Error(`Traccia non trovata: ${slug}`);
	const data = yaml.load(raw) as YamlRoot;
	if (!data?.titolo || !Array.isArray(data.frasi)) {
		throw new Error(`YAML invalido per ${slug}`);
	}
	return data;
}

export function listTracce(): TracciaSummary[] {
	return Object.keys(frasiModules)
		.map(slugFromPath)
		.sort()
		.map((slug) => {
			const { titolo } = parseYaml(slug);
			return { slug, titolo };
		});
}

export function loadTraccia(slug: string): TracciaContent {
	const raw = frasiModules[frasiPath(slug)];
	const percorsoSvg = svgModules[svgPath(slug)];
	if (!raw || !percorsoSvg) {
		throw new Error(`Traccia non trovata: ${slug}`);
	}
	const { titolo, frasi } = parseYaml(slug);
	return { slug, titolo, frasi, percorsoSvg };
}

export function tracciaSlugs(): string[] {
	return Object.keys(frasiModules)
		.map(slugFromPath)
		.sort();
}
