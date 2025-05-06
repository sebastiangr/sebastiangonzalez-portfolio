<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment'; // Import browser check

	import { gsap } from 'gsap';
	// --- IMPORTANT ---
	// Adjust the import path based on how you installed/obtained ScrollSmoother
	// If installed via npm (Club GreenSock private repo or included):
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	// If you downloaded the file, you might need a different path, e.g.:
	// import { ScrollTrigger } from '$lib/gsap/ScrollTrigger';
	// import { ScrollSmoother } from '$lib/gsap/ScrollSmoother';
	// ---

	/**
	 * @type {globalThis.ScrollSmoother}
	 */
	let smoother; // Variable to hold the ScrollSmoother instance

  
	onMount(() => {
		// Ensure this code only runs in the browser
		if (browser) {
			// Register GSAP plugins
			gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

			// Create the ScrollSmoother instance
			smoother = ScrollSmoother.create({
				wrapper: '#smooth-wrapper', // Selector for the outer wrapper
				content: '#smooth-content', // Selector for the inner content
				smooth: 1, // How much smoothing (1 = default, higher = more smooth)
				effects: true, // Look for data-speed and data-lag attributes for easy parallax
                // normalizeScroll: true, // (Optional) Attempts to make scrolling consistent across devices/browsers
                // ignoreMobileResize: true, // (Optional) Prevents ScrollTrigger refreshes on mobile viewport resize due to URL bar hiding
				// smoothTouch: 0.1, // (Optional) Smoothing specifically for touch devices (0 = disabled)
			});

            console.log('ScrollSmoother created');

            // Optional: You might want to force a ScrollTrigger refresh if content
            // loading changes layout height significantly after initial mount
            // ScrollTrigger.refresh();
		}

        // Cleanup function is returned from onMount
        return () => {
             if (browser) {
                 console.log('Destroying ScrollSmoother...');
                 // Kill the ScrollSmoother instance on component destroy
                 if (smoother) {
                     smoother.kill();
                 }
                 // You might also want to kill associated ScrollTriggers
                 // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                 console.log('ScrollSmoother destroyed');
             }
        };
	});

    // onDestroy is still valid in Svelte 5 and often clearer for cleanup
    // You could also put the cleanup logic directly in the return function of onMount
    // onDestroy(() => {
    //     if (browser) {
    // 		console.log('Destroying ScrollSmoother (onDestroy)...');
	// 		// Kill the ScrollSmoother instance on component destroy
	// 		if (smoother) {
	// 			smoother.kill();
	// 		}
    //         // You might also want to kill associated ScrollTriggers
    //         // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    //         console.log('ScrollSmoother destroyed (onDestroy)');
	// 	}
    // });


</script>


<!-- The required HTML structure for ScrollSmoother -->
<div id="smooth-wrapper">
	<div id="smooth-content">
		<!-- The rest of your app's content goes here -->
		<slot />
	</div>
</div>


<style>
	/* Basic CSS required for ScrollSmoother */
	/* Ensure body/html allow height */
	:global(body) {
		/* Optional: Set a background if needed */
		/* background-color: #f0f0f0; */
	}

	/*
	The wrapper needs to be fixed or absolute to cover the viewport
    and hide the native scrollbar.
    Adjust top/left/right/bottom as needed if you have fixed headers/footers
    *outside* the #smooth-wrapper.
    */
	#smooth-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden; /* Crucial: Hides the native scrollbar */
        /* background: lightcoral; */ /* DEBUG: temporary background */

	}

    /*
    The content needs to allow scrolling. GSAP calculates its height
    and applies transforms to the wrapper for the smooth effect.
    */
	#smooth-content {
		/* width: 100%; */ /* Usually defaults to 100% */
		overflow: visible; /* Allows content to overflow and be scrollable */
        /* background: lightblue; */ /* DEBUG: temporary background */
        /* Add some height to test scrolling */
        /* min-height: 100vh; */ /* Ensure it can at least fill the viewport */
	}

	/* Optional: Prevent interference from other fixed elements */
	/* Make sure any other position:fixed elements on your page
	   are *outside* the #smooth-wrapper if they should NOT scroll,
	   or *inside* #smooth-content if they SHOULD scroll with the content. */

    /* Example: A fixed header *outside* the scrollable area */
    /*
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        background: white;
        padding: 1rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    /* If you have such a header, you might need to adjust the top of #smooth-wrapper */
    /*
    #smooth-wrapper {
        top: 60px; /* Example: Adjust based on header height */
    /*    height: calc(100% - 60px);
    }
    */

</style>