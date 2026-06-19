import { expect, test } from '@playwright/test';

test('francesco page shows hero and link to tracce hub', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await expect(page.getByRole('heading', { level: 1, name: 'La storia di Francesco' })).toBeVisible();
	await expect(page.getByText(/Francesco attraversa ogni giorno/i)).toBeVisible();
	await expect(page.locator('.hero-art img')).toBeVisible();
	const cta = page.getByRole('link', { name: 'Scopri le sue tracce e i suoi tracciati' });
	await expect(cta).toBeVisible();
	await expect(cta).toHaveAttribute('href', /\/tracce-e-tracciati\/?$/);
});

test('francesco CTA navigates to tracce hub', async ({ page }) => {
	await page.goto('/storia-di-francesco');
	await page.getByRole('link', { name: 'Scopri le sue tracce e i suoi tracciati' }).click();
	await expect(page).toHaveURL(/\/tracce-e-tracciati\/?$/);
	await expect(page.getByRole('heading', { name: 'Tracce', exact: true })).toBeVisible();
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
