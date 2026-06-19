import { expect, test } from '@playwright/test';

test('home shows cover only', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('region', { name: 'Copertina' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracce minori' })).toBeVisible();
	await expect(page.getByText('Storie che attraversano la città')).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracce', exact: true })).not.toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracciati' })).not.toBeVisible();
});
