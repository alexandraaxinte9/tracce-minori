import { expect, test } from '@playwright/test';

test('francesco page shows hero, sections and four caselle', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await expect(page.getByRole('heading', { level: 1, name: 'La storia di Francesco' })).toBeVisible();
	await expect(page.getByText(/Francesco attraversa ogni giorno/i)).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Le sue tracce...' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'e i suoi tracciati' })).toBeVisible();
	await expect(page.locator('.casella')).toHaveCount(4);
	await expect(page.locator('.hero-art img')).toBeVisible();
});

test('francesco header links home and about', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await page.getByRole('link', { name: 'Home' }).click();
	await expect(page).toHaveURL(/\/$/);
});

test('about CTA navigates to francesco page', async ({ page }) => {
	await page.goto('/about');
	await page.getByRole('link', { name: /Francesco/i }).click();
	await expect(page).toHaveURL(/storia-di-francesco/);
	await expect(page.getByRole('heading', { level: 1, name: 'La storia di Francesco' })).toBeVisible();
});
