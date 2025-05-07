<script>
	import Preloader from '$lib/components/Preloader.svelte';
  import { browser } from '$app/environment';
  import { gsap } from 'gsap';
  import '../app.scss';
  
  	// --- IMPORTANT ---
	// Adjust the import path based on how you installed/obtained ScrollSmoother
	// If installed via npm (Club GreenSock private repo or included):
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import FullScreenMenu from '$lib/components/FullScreenMenu.svelte';

	// State: Is the page fully loaded (including assets)? Start false.
	// This ensures the server renders without the main content initially.
	let isPageReady = $state(false);

  /**
  * @type {globalThis.ScrollSmoother}
  */
	let smoother; // Variable to hold the ScrollSmoother instance

  // Effect: Runs only on the client to listen for the 'load' event
	$effect(() => {
		// Only run this logic in the browser environment
		if (browser) {   

			// Register GSAP plugins
			// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

			// // Create the ScrollSmoother instance
			// smoother = ScrollSmoother.create({
			// 	wrapper: '#smooth-wrapper', // Selector for the outer wrapper
			// 	content: '#smooth-content', // Selector for the inner content
			// 	smooth: 1, // How much smoothing (1 = default, higher = more smooth)
			// 	effects: true, // Look for data-speed and data-lag attributes for easy parallax
      //           // normalizeScroll: true, // (Optional) Attempts to make scrolling consistent across devices/browsers
      //           // ignoreMobileResize: true, // (Optional) Prevents ScrollTrigger refreshes on mobile viewport resize due to URL bar hiding
			// 	// smoothTouch: 0.1, // (Optional) Smoothing specifically for touch devices (0 = disabled)
			// });      

			const markPageAsReady = () => {
				console.log("window.onload event fired!"); // Debug log
				isPageReady = true;
			};

			// Check if the load event has already fired before this script ran
			// (can happen in some edge cases or with fast connections/caching)
			if (document.readyState === 'complete') {
        console.log("Document already complete on script run."); // Debug log
				markPageAsReady();
			} else {
        console.log("Adding window.onload listener."); // Debug log
				// Add the event listener. Use { once: true } so it automatically removes itself.
				window.addEventListener('load', markPageAsReady, { once: true });
			}

		}
	}); 

</script>


<!-- Preloader Section -->
{#if !isPageReady}
  <Preloader />
{/if}

{#if isPageReady}
  {#key isPageReady}
    <div class="content-fade-in">
      <slot />
    </div>
  {/key}
{/if}

<!-- {#if isPageReady}

{/if} -->


<style>

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.fade-in-content {
		animation: fadeIn 0.5s ease-in forwards;
	}

</style>