// src/lib/stores/menuStore.js
import { writable } from 'svelte/store';

// Writable store: true if menu is open, false otherwise
export const isMenuOpen = writable(false);

// Function to open the menu
export function openMenu() {
	isMenuOpen.set(true);
}

// Function to close the menu
export function closeMenu() {
	isMenuOpen.set(false);
}

// Function to toggle the menu state
export function toggleMenu() {
	isMenuOpen.update((n) => !n);
}