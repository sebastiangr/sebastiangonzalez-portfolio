import { writable } from "svelte/store";

// Define the array of anchor IDs
export const anchors = writable(["#home", "#about-me", "#portfolio", "#skills", "#contact"]);

// Store for the current index
export const currentIndex = writable(0);