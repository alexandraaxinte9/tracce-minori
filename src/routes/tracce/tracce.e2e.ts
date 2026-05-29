import { expect, test } from '@playwright/test';

test('hub lists tracce and opens traccia-01', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Tracce minori' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracce' })).toBeVisible();
	await page.getByRole('link', { name: /Traccia 01/i }).click();
	await expect(page).toHaveURL(/traccia-01/);
});

test('hub lists tracciati and opens tracciati-01', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Tracciati' })).toBeVisible();
	await page.getByRole('link', { name: /Tracciato 01/i }).click();
	await expect(page).toHaveURL(/tracciati-01/);
});
