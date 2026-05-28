import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';
import type { TracciaContent, TracciaSummary, Frase } from './types';

const TRACCE_ROOT = join(process.cwd(), 'static', 'tracce');

type YamlRoot = {
	titolo: string;
	frasi: Frase[];
};

export function listTracce(): TracciaSummary[] {
	const dirs = readdirSync(TRACCE_ROOT, { withFileTypes: true })
		.filter((d) => d.isDirectory() && d.name.startsWith('traccia-'))
		.map((d) => d.name)
		.sort();

	return dirs.map((slug) => {
		const { titolo } = parseYaml(slug);
		return { slug, titolo };
	});
}

export function loadTraccia(slug: string): TracciaContent {
	const dir = join(TRACCE_ROOT, slug);
	if (!existsSync(dir)) {
		throw new Error(`Traccia non trovata: ${slug}`);
	}
	const { titolo, frasi } = parseYaml(slug);
	const percorsoSvg = readFileSync(join(dir, 'percorso.svg'), 'utf8');
	return { slug, titolo, frasi, percorsoSvg };
}

function parseYaml(slug: string): YamlRoot {
	const raw = readFileSync(join(TRACCE_ROOT, slug, 'frasi.yaml'), 'utf8');
	const data = yaml.load(raw) as YamlRoot;
	if (!data?.titolo || !Array.isArray(data.frasi)) {
		throw new Error(`YAML invalido per ${slug}`);
	}
	return data;
}

export function tracciaSlugs(): string[] {
	return listTracce().map((t) => t.slug);
}
