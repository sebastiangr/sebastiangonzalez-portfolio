// Vercel Speed Insights
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

import type { LayoutLoad } from './$types';
import { loadingStore } from '$lib/stores/loadingStore';
import { browser } from '$app/environment'; // To only run setTimeout in browser

// Vercel Speed Insights Inyection
injectSpeedInsights();

// Simulate network delay for fetching data (e.g., blog posts)
const DATA_LOAD_DELAY_MS = 100; // 2.5 seconds - Adjust for testing

export const load: LayoutLoad = async ({ fetch }) => {
	console.log('🚨 +layout.ts load function started');

	// Mark data as loading IN THE BROWSER ONLY
  // (SSR doesn't need this preloader state management)
  if (browser) {
    loadingStore.update(s => ({ ...s, dataLoading: true, windowLoaded: false })); // Reset on navigation potentially
  }

	// --- Simulate fetching essential data ---
	const dataPromise = new Promise<object | null>((resolve) => {
    if (browser) {
      setTimeout(() => {
        console.log('+layout.ts simulated data fetched.');
        // Example: const posts = await fetch('/api/posts').then(res => res.json());
        resolve({ someData: 'Data loaded after delay' });
      }, DATA_LOAD_DELAY_MS);
    } else {
      // On SSR, resolve immediately or fetch data directly if needed server-side
      resolve({ someData: 'Data from SSR' });
    }
	});
	// --------------------------------------

	// Wait for the data promise to resolve
	const loadedData = await dataPromise;

	// Mark data as finished loading IN THE BROWSER ONLY
  if (browser) {
    console.log('+layout.ts marking dataLoading = false in store');
    loadingStore.update(s => ({ ...s, dataLoading: false }));
  }

	// Return data to be available in +layout.svelte
	return {
		loadedData // You can access this via `export let data;` in +layout.svelte
	};
};

// Might be needed if you don't have other pages/routes defined yet
export const prerender = false;