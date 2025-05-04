<script lang="ts">
  import Logo from "$lib/assets/sebastiangonzalez.co-logo.svg";
  import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { loadingStore, isFullyLoaded } from '$lib/stores/loadingStore';

	// --- Configuration ---
	const PROGRESS_TICK_MS = 100;       // How often to update simulated progress
	const MAX_SIMULATED_PROGRESS = 95; // Don't let simulation reach 100%
  const FADE_OUT_DELAY_MS = 100;      // Delay after fully loaded before starting fades
  const INNER_FADE_DURATION_MS = 500; // Logo/text fade duration (Tailwind: duration-500)
  const CONTAINER_FADE_DURATION_MS = 300; // Background fade duration (Tailwind: duration-300)

  // Props
  let { logoSrc = '/logo.svg' } = $props();

	// --- State ---
	let progress = $state(0);             // Progress bar percentage (0-100)
	let isVisible = $state(true);         // Controls presence in DOM via {#if}
	let showInnerContent = $state(false); // Controls logo/text fade/scale animation
  let isFadingOutContainer = $state(false); // Controls the final container fade-out
	let ellipsisStage = $state(0);
  let internalFullyLoaded = $state(false); // Local state to track when loading completed

  let progressIntervalId: ReturnType<typeof setInterval> | null = null; // Store interval ID

  // --- Derived State --- REMOVE?
  let rotation = $derived(progress * 3.6); // Calculate rotation degrees (0-360)
  let ellipsis = $derived('.'.repeat(ellipsisStage)); // Calculate ellipsis string
  

  // --- Effects ---

  // EFFECT 1
  // Effect to initialize, handle entry animation, and start intervals
  $effect(() => {
    if (!browser) return; // Only run client-side

    console.log('Preloader effect: Initializing...');
    // Reset progress on mount (useful for SPA navigations if component remounts)
    progress = 0;
    isFadingOutContainer = false;
    showInnerContent = false;
    internalFullyLoaded = false;

		// 1. Trigger INNER CONTENT entry animation shortly after mount
		const entryTimer = setTimeout(() => {
      console.log('Preloader effect: Triggering INNER content animation');
			showInnerContent = true;
		}, 50);

		// 2. Start SIMULATED Progress Interval (if not already loaded)
    // Clear any previous interval first
    if (progressIntervalId) clearInterval(progressIntervalId);

    if (!isFullyLoaded($loadingStore)) {
      console.log('Preloader effect: Starting progress simulation interval.');
      progressIntervalId = setInterval(() => {
        // Only advance progress if not yet fully loaded and below cap
        if (!internalFullyLoaded && progress < MAX_SIMULATED_PROGRESS) {
          progress += 1; // Adjust increment step if needed
        } else {
          // Stop simulating if fully loaded or cap reached
          if (progressIntervalId) {
            console.log('Preloader effect: Clearing progress interval (loaded or cap reached).');
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      }, PROGRESS_TICK_MS);
    } else {
      console.log('Preloader effect: Already fully loaded, skipping progress interval.');
      progress = 100; // Ensure bar is full if loaded instantly
      internalFullyLoaded = true; // Mark as loaded immediately
      // Directly trigger fade out sequence (handled by the next effect)
    }


		// 3. Start Ellipsis Animation Interval
		const ellipsisInterval = setInterval(() => {
			ellipsisStage = (ellipsisStage + 1) % 4;
		}, 400);

    // 4. Cleanup Function
		return () => {
      console.log('Preloader effect: Cleanup.');
			clearTimeout(entryTimer);
			if (progressIntervalId) clearInterval(progressIntervalId);
			clearInterval(ellipsisInterval);
		};
	});

  // EFFECT 2  
  // Effect to listen for window.onload
  $effect(() => {
    if (!browser) return;

    const handleLoad = () => {
      console.log('Preloader: window.onload fired.');
      // Update the store only if not already marked as loaded
      if (!$loadingStore.windowLoaded) {
        loadingStore.update(s => ({ ...s, windowLoaded: true }));
      }
    };

    if (document.readyState === 'complete') {
      // If already loaded when script runs
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Cleanup listener
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  });

  // EFFECT 3
  // Effect to react when loading is TRULY complete (data + window)
  $effect(() => {
    if (!browser) return;

    const fullyLoaded = isFullyLoaded($loadingStore);

    // Only react when it transitions to fully loaded
    if (fullyLoaded && !internalFullyLoaded) {
      console.log('Preloader reaction: Detected fully loaded state!');
      internalFullyLoaded = true; // Mark locally to prevent re-triggering
      progress = 100; // Jump progress bar to 100%

      // Clear progress interval if it's somehow still running
      if (progressIntervalId) {
        console.log('Preloader reaction: Clearing progress interval (just in case).');
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }

      // Start the fade-out sequence
      console.log('Preloader reaction: Starting fade-out sequence...');
      const innerFadeOutTimer = setTimeout(() => {
        console.log('Preloader reaction: Fading out inner content.');
        showInnerContent = false;
      }, FADE_OUT_DELAY_MS);

      const containerFadeOutTimer = setTimeout(() => {
        console.log('Preloader reaction: Fading out container.');
        isFadingOutContainer = true;
      }, FADE_OUT_DELAY_MS); // Start container fade at same time

      const removalTimer = setTimeout(() => {
        console.log('Preloader reaction: Removing component from DOM.');
        isVisible = false;
      }, FADE_OUT_DELAY_MS + CONTAINER_FADE_DURATION_MS + 50); // Delay + Container Fade + buffer

      // --- IMPORTANT: Cleanup for these timers ---
      // Since these timers are created *within* this effect,
      // they need their own cleanup mechanism if the component
      // were destroyed *during* the fade-out. Svelte's effect
      // cleanup handles this automatically if the effect re-runs
      // or the component is destroyed.
      // You could store IDs and clear them in the main effect's
          // cleanup, but Svelte's handling is generally sufficient here.
      } else if (!fullyLoaded) {
      // If navigation happens and store resets, reset internal state too
      internalFullyLoaded = false;
    }
  });

</script>

{#if isVisible} <!-- Only render preloader in browser -->
  <div id="preloader-container"
    class:opacity-0={isFadingOutContainer}
    class="preloader-base bg-gray900 fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 
    transition-opacity ease-in-out duration-300"
    aria-label="Loading page content"
    role="status"
    aria-busy="true" >

    <!-- Progress Bar -->
    <div class="preloader-progress-bar-bg"> <!-- Bar background -->
      <div class="preloader-progress-bar bg-red-600"
        style:width="{progress}%" >
      </div>
    </div>    

		<!-- Logo Wrapper (Constant Rotation + Fade/Scale) -->
		<div id="rotating-logo-wrapper"
			class="preloader-logo-wrapper mt-4 transition-all ease-out duration-500 animate-spin-slow"      
      class:scale-100={showInnerContent}
			class:opacity-100={showInnerContent}
			class:scale-90={!showInnerContent}
			class:opacity-0={!showInnerContent}	>   
        
      <div class="logo-loader">
        <img src={Logo} alt="sebastiangonzalez.co" class="" />
      </div>
    </div> 

		<!-- Loading Text (Fade/Scale) -->
		<p class="preloader-textmt-4 text-lg md:text-xl font-semibold text-gray-200 transition-all
      ease-out duration-500 animate-pulse-subtle"
      class:scale-100={showInnerContent}
			class:opacity-100={showInnerContent}
			class:scale-90={!showInnerContent}
			class:opacity-0={!showInnerContent} >
			Loading{ellipsis}
		</p>

  </div>
{/if}


<style lang="scss">

  /* ****** ADDED CRITICAL BASE STYLES ****** */
  .preloader-base {
    position: fixed;
    inset: 0;
    z-index: 50; /* Or higher if needed */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Background color is set by Tailwind bg-gray-900 */
    /* Opacity transition is handled by Tailwind */
  }

  .preloader-progress-bar-bg {
    position: fixed; /* Changed from absolute */
    top: 0;
    left: 0;
    height: 4px; /* Tailwind h-1 */
    width: 100%; /* Tailwind w-full */
    background-color: #4b5563; /* Tailwind bg-gray-700 */
    z-index: 51; /* Ensure it's above the main bg */
  }

  .preloader-progress-bar {
    height: 100%; /* Fill parent height */
    /* Background set by Tailwind bg-red-600 */
    transition-property: width; /* Specific transition */
    transition-timing-function: linear;
    transition-duration: 300ms; /* Tailwind duration-300 */
  }

  .preloader-logo-wrapper {
    /* Centering handled by flex on parent */
    /* Margin set by Tailwind mt-4 */
    transform-origin: center; /* Crucial for rotation */
  }

  .preloader-text {
    /* Margin set by Tailwind mt-4 */
    /* Font size, weight, color by Tailwind */
  }  

  /* Spin Animation */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin 5s linear infinite;
  }

  /* Pulse Animation */
  @keyframes pulse-subtle {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  .animate-pulse-subtle {
    animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Ensure dynamic duration classes are available if needed */
  /* Add to safelist in tailwind.config.js if purging issues */
  .duration-300 { transition-duration: 300ms; }
  .duration-500 { transition-duration: 500ms; }

  // TODO: Move to global animations css
  // /* Define the constant spin animation */
  // @keyframes spin {
  //   from { transform: rotate(0deg); }
  //   to { transform: rotate(360deg); }
  // }  

  // /* Apply it with desired duration */
  // .animate-spin-slow {
  //   animation: spin 5s linear infinite; /* 5 seconds per full rotation */
  //   transform-origin: center; /* Ensure rotation is centered */
  // }  

	// @keyframes pulse-subtle {
	// 	0%, 100% { opacity: 0.8; }
	// 	50% { opacity: 1; }
	// }
	// .animate-pulse-subtle {
	// 	animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	// }

  // /* Ensure dynamic duration classes are available if needed */
  // /* (May require adding them to safelist in tailwind.config.js if purging aggressively) */
  // .duration-300 { transition-duration: 300ms; }
  // .duration-500 { transition-duration: 500ms; }


  .logo-loader img {
    margin: 30px;
    width: 100px;
    height: 100px;
  }

  span.loading-text {
    color: var(--color-white);
    font-size: 1.5rem;
    font-family:  var(--main-font), sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: italic;
    font-variation-settings:
      "wdth" 100,
      "YTLC" 500;;
  }
     

	// @keyframes pulse-subtle {
	// 	0%, 100% { opacity: 0.8; }
	// 	50% { opacity: 1; }
	// }
	// .animate-pulse-subtle {
	// 	animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	// }

  /* Ensure rotation happens around the center */
  #rotating-logo-wrapper {
    transform-origin: center;
  }

  /* Ensure rotation happens around the center */
  [style*="transform: rotate"] {
    transform-origin: center;
  }
</style>