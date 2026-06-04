import { expect, test } from '@playwright/test';

test('about page shows intro, sections and disabled CTA', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByRole('heading', { name: 'Tracce' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracciati' })).toBeVisible();
	await expect(page.getByText(/Molti percorsi urbani/i)).toBeVisible();
	const cta = page.getByRole('button', { name: /Francesco/i });
	await expect(cta).toBeVisible();
	await expect(cta).toBeDisabled();
	await expect(page.locator('.overlay img')).toHaveCount(2);
	await expect(page.locator('.percorso-statico')).toHaveCount(2);
});

test('about header links home and tracciati', async ({ page }) => {
	await page.goto('/about');
	await page.getByRole('link', { name: 'Home' }).click();
	await expect(page).toHaveURL(/\/$/);
});
