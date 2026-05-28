import { expect, test } from '@playwright/test';

test('lists tracce and opens traccia-01', async ({ page }) => {
	await page.goto('/tracce');
	await expect(page.getByRole('heading', { name: 'Tracce' })).toBeVisible();
	await page.getByRole('link', { name: /Traccia 01/i }).click();
	await expect(page).toHaveURL(/traccia-01/);
});
