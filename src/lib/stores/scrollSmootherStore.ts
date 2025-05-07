// src/lib/stores/scrollSmootherStore.ts
import { writable } from 'svelte/store';
import type { ScrollSmoother } from 'gsap/ScrollSmoother';

// Initialize the store with null, as ScrollSmoother isn't available immediately
export const smootherStore = writable<ScrollSmoother | null>(null);