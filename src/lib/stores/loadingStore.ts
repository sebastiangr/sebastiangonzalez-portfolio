import { writable } from 'svelte/store';

interface LoadingState {
	dataLoading: boolean; // Is the essential layout data still loading?
	windowLoaded: boolean; // Has window.onload fired?
}

// Initialize with data assumed to be loading and window not yet loaded
export const loadingStore = writable<LoadingState>({
	dataLoading: true,
	windowLoaded: false,
});

// Helper to check if everything is considered loaded
export function isFullyLoaded(state: LoadingState): boolean {
    // console.log(`Checking loaded: dataLoading=${state.dataLoading}, windowLoaded=${state.windowLoaded}`);
	return !state.dataLoading && state.windowLoaded;
}