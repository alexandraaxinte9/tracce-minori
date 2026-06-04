import { expect, test } from '@playwright/test';

test('homepage shows brand and opens traccia-01', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByAltText('Tracce Minori')).toBeVisible();
	await expect(page.getByText('STORIE CHE ATTRAVERSANO LA CITTÀ')).toBeVisible();
	await page.goto('/tracce/traccia-01');
	await expect(page).toHaveURL(/traccia-01/);
});

test('homepage nav opens tracciati-01', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('navigation', { name: 'Principale' }).getByRole('link', { name: 'Tracciati' }).click();
	await expect(page).toHaveURL(/tracciati-01/);
});
