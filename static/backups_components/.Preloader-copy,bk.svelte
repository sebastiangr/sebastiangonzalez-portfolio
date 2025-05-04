<script lang="ts">
    import Logo from "$lib/assets/sebastiangonzalez.co-logo.svg";
	import { onDestroy } from 'svelte';

  // --- Configuration ---
	const TOTAL_DURATION_MS = 6000; // Total time for the preloader simulation
	const TICK_MS = 50;             // Progress update frequency
  const FADE_OUT_DELAY_MS = 100; // Delay after TOTAL_DURATION before starting fades
  const INNER_FADE_DURATION_MS = 500; // Duration for logo/text fade (match Tailwind)
  const CONTAINER_FADE_DURATION_MS = 300; // Duration for the whole container fade-out (can be different)

  // Props
  let { logoSrc = '/logo.svg' } = $props();

  // --- State using Svelte 5 Runes ---
  let progress = $state(0); // Loading progress (0-100)
  let isVisible = $state(true); // Controls overall component visibility for fade-out
  let showInnerContent = $state(false);// Controls logo/text fade/scale animation
  let isFadingOutContainer = $state(false); // NEW: Controls the final container fade-out
  let ellipsisStage = $state(0);
  let startTime = $state(0);

  // --- Derived State ---
  let rotation = $derived(progress * 3.6); // Calculate rotation degrees (0-360)
  let ellipsis = $derived('.'.repeat(ellipsisStage)); // Calculate ellipsis string

  // --- Effects ---
  $effect(() => {
    console.log('Preloader effect starting.');
    startTime = Date.now();

    // 1. Trigger INNER CONTENT entry animation
    const entryTimer = setTimeout(() => {
      console.log('Triggering INNER content animation (showInnerContent=true)');
      showInnerContent = true;
    }, 50);

    // 2. Progress Simulation Interval
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      // Ensure progress calculation doesn't exceed 100 based on time
      const currentProgress = Math.min(100, (elapsedTime / TOTAL_DURATION_MS) * 100);
      progress = currentProgress;

      // Stop interval when duration is reached
      if (elapsedTime >= TOTAL_DURATION_MS) {
        progress = 100; // Ensure it hits exactly 100
        console.log('Progress interval reached total duration, clearing.');
        clearInterval(progressInterval);
      }
    }, TICK_MS);

    // 3. Ellipsis Animation Interval
    const ellipsisInterval = setInterval(() => {
      ellipsisStage = (ellipsisStage + 1) % 4;
    }, 400);

    // 4. Main Timer to End Simulation and Start Fade Out of Inner Content
    const completionTimer = setTimeout(() => {
      console.log(`Total duration (${TOTAL_DURATION_MS}ms) reached. Starting inner content fade out sequence.`);
      progress = 100; // Ensure final state is 100/360deg
      // Clear intervals immediately when duration is complete
      clearInterval(progressInterval);
      clearInterval(ellipsisInterval);

      // Start fading out INNER CONTENT after delay
      const innerFadeOutTimer = setTimeout(() => {
        console.log('Triggering INNER content exit animation (showInnerContent=false)');
        showInnerContent = false; // Fade out logo/text
      }, FADE_OUT_DELAY_MS);

      // Remove the component from DOM AFTER the INNER content fade completes
      const removalTimer = setTimeout(() => {
        console.log('Hiding component completely (isVisible=false)');
        isVisible = false; // Remove from DOM abruptly
      }, FADE_OUT_DELAY_MS + INNER_FADE_DURATION_MS + 50); // Delay + Inner Fade Duration + buffer

      // Add timer IDs to cleanup array
      cleanupFunctions.push(() => clearTimeout(innerFadeOutTimer));
      cleanupFunctions.push(() => clearTimeout(removalTimer));

    }, TOTAL_DURATION_MS);

    // 5. Cleanup Function Setup
    const cleanupFunctions: (() => void)[] = [
      () => clearTimeout(entryTimer),
      () => clearInterval(progressInterval),
      () => clearInterval(ellipsisInterval),
      () => clearTimeout(completionTimer),
    ];

    return () => {
      console.log('Running preloader effect cleanup.');
      cleanupFunctions.forEach(cleanup => cleanup());
    };
	});

</script>

{#if isVisible}
  <div id="preloader-container"
    class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-900"  
    aria-label="Loading page content"
    role="status"
    aria-busy="true" >

  <!-- Logo Wrapper (Handles Rotation and Fade/Scale) -->
    <div id="rotating-logo-wrapper"      
      class="transition-all ease-out duration-500"
      class:scale-100={showInnerContent}
      class:opacity-100={showInnerContent}
      class:scale-90={!showInnerContent}
      class:opacity-0={!showInnerContent}      
      style="transform: rotate({rotation}deg);" >
  
      <div class="logo-loader">
        <img src={Logo} alt="sebastiangonzalez.co" class="" />
      </div>
    </div>

    <!-- Loading Text (Handles Fade/Scale) -->
    <p class="mt-4 text-lg md:text-xl font-semibold text-gray-200 animate-pulse-subtle transition-all ease-out duration-500"
      class:scale-100={showInnerContent}
      class:opacity-100={showInnerContent}
      class:scale-90={!showInnerContent}
      class:opacity-0={!showInnerContent} >
      Loading{ellipsis}
    </p>
  </div>
	<!-- <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 transition-opacity ease-in-out"
    class:opacity-0={isFadingOutContainer}
    style="transition-duration: {CONTAINER_FADE_DURATION_MS}ms;"
		aria-label="Loading page content"
		role="status"
		aria-busy="true" > -->

		<!-- Logo -->
		<!-- <div class="transition-all ease-out duration-500"
      style:transition-duration="{INNER_FADE_DURATION_MS}ms"
      class:scale-100={showInnerContent}
      class:opacity-100={showInnerContent}
      class:scale-90={!showInnerContent}
      class:opacity-0={!showInnerContent}
      style:transform="rotate({rotation}deg);"	>

      <div class="logo-loader">
        <img src={Logo} alt="sebastiangonzalez.co" class="" />
      </div>
		</div> -->

    <!-- <span class="loading-text transition-all ease-out duration-500 pulse-subtle"
      style:transition-duration="{INNER_FADE_DURATION_MS}ms"
      class:scale-100={showInnerContent}
      class:opacity-100={showInnerContent}
      class:scale-90={!showInnerContent}
      class:opacity-0={!showInnerContent} >
			Loading{ellipsis}
    </span>
	</div> -->
{/if}


<style lang="scss">
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
     

	@keyframes pulse-subtle {
		0%, 100% { opacity: 0.8; }
		50% { opacity: 1; }
	}
	.animate-pulse-subtle {
		animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

  /* Ensure rotation happens around the center */
  #rotating-logo-wrapper {
    transform-origin: center;
  }

  /* Ensure rotation happens around the center */
  [style*="transform: rotate"] {
    transform-origin: center;
  }
</style>