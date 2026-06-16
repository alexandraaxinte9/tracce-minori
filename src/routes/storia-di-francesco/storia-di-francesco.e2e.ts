import { expect, test } from '@playwright/test';

test('francesco page shows hero, sections and six caselle', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await expect(page.getByRole('heading', { level: 1, name: 'La storia di Francesco' })).toBeVisible();
	await expect(page.getByText(/Francesco attraversa ogni giorno/i)).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Le sue tracce...' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'e i suoi tracciati' })).toBeVisible();
	await expect(page.locator('.casella')).toHaveCount(6);
	await expect(page.locator('.casella--tracce svg')).toHaveCount(3);
	await expect(page.locator('.casella--tracciati svg')).toHaveCount(3);
	await expect(page.locator('.hero-art img')).toBeVisible();
});

test('francesco tracce casella opens traccia page', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await page.getByRole('link', { name: 'Apri Traccia 01' }).click();
	await expect(page).toHaveURL(/traccia-01/);
});

test('traccia page back arrow returns to francesco', async ({ page }) => {
	await page.goto('/tracce/traccia-01');
	await page.getByRole('link', { name: 'Torna alla storia di Francesco' }).click();
	await expect(page).toHaveURL(/storia-di-francesco/);
});

test('tracciato page back arrow returns to francesco', async ({ page }) => {
	await page.goto('/tracciati/tracciati-01');
	await page.getByRole('link', { name: 'Torna alla storia di Francesco' }).click();
	await expect(page).toHaveURL(/storia-di-francesco/);
});

test('francesco header links home and about', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
	await page.getByRole('link', { name: 'Home' }).click();
	await expect(page).toHaveURL(/\/$/);
});

test('about CTA navigates to francesco page', async ({ page }) => {
	await page.goto('/about');
	await page.getByRole('link', { name: 'Scopri la storia di Francesco' }).click();
	await expect(page).toHaveURL(/storia-di-francesco/);
	await expect(page.getByRole('heading', { level: 1, name: 'La storia di Francesco' })).toBeVisible();
});
