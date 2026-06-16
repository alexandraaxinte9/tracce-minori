import { expect, test } from '@playwright/test';

test('about page shows intro, sections and Francesco CTA link', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByRole('heading', { name: 'Tracce' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Tracciati' })).toBeVisible();
	await expect(page.getByText(/Molti percorsi urbani/i)).toBeVisible();
	const cta = page.getByRole('link', { name: 'Scopri la storia di Francesco' });
	await expect(cta).toBeVisible();
	await expect(cta).toHaveAttribute('href', /storia-di-francesco/);
	await page.locator('.overlay img').first().waitFor();
	await expect(page.locator('.overlay img')).toHaveCount(2);
	await expect(page.locator('.percorso-statico')).toHaveCount(2);
});

test('about header links home and tracciati', async ({ page }) => {
	await page.goto('/about');
	await page.getByRole('link', { name: 'Home' }).click();
	await expect(page).toHaveURL(/\/$/);
	await page.goto('/about');
	await page.getByRole('navigation', { name: 'Principale' }).getByRole('link', { name: 'Tracciati' }).click();
	await expect(page).toHaveURL(/\/$/);
	await expect(page.getByRole('heading', { name: 'Tracce minori' })).toBeVisible();
});
