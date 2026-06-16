import { expect, test } from '@playwright/test';

test('hub lists tracce and opens traccia-01', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
	await expect(page.getByRole('navigation', { name: 'Principale' }).getByRole('link', { name: 'Francesco' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracce minori' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracce', exact: true })).toBeVisible();
	await expect(page.locator('.casella')).toHaveCount(6);
	await page.getByRole('link', { name: /Traccia 01/i }).click();
	await expect(page).toHaveURL(/traccia-01/);
});

test('hub lists tracciati and opens tracciati-01', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Tracciati' })).toBeVisible();
	await page.getByRole('link', { name: /Tracciato 01/i }).click();
	await expect(page).toHaveURL(/tracciati-01/);
});

test('traccia page back arrow returns to hub', async ({ page }) => {
	await page.goto('/tracce/traccia-01');
	await page.getByRole('link', { name: 'Torna a Tracce minori' }).click();
	await expect(page).toHaveURL(/\/$/);
});

test('tracciato page back arrow returns to hub', async ({ page }) => {
	await page.goto('/tracciati/tracciati-01');
	await page.getByRole('link', { name: 'Torna a Tracce minori' }).click();
	await expect(page).toHaveURL(/\/$/);
});
