<script>
	import Preloader from '$lib/components/Preloader.svelte';
  import { browser } from '$app/environment';
  import '../app.scss';
  
	// State: Is the page fully loaded (including assets)? Start false.
	// This ensures the server renders without the main content initially.
	let isPageReady = $state(false);


  // Effect: Runs only on the client to listen for the 'load' event
	$effect(() => {
		// Only run this logic in the browser environment
		if (browser) {
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

			// With { once: true }, explicit cleanup is less critical, but good practice:
			// return () => {
			//  if (BROWSER) { // Check BROWSER again in cleanup
			//      window.removeEventListener('load', markPageAsReady);
			//  }
			// };
		}
	}); // This effect structure effectively runs once on mount


</script>

<!-- /* Apply base font smoothing */ -->
<div class="antialiased">

  <!-- Preloader Section -->
  <!-- This will be rendered initially by the server -->
  <!-- It will be removed by the #if block when isPageReady becomes true -->
  {#if !isPageReady}
    <Preloader />
  {/if}


  <!-- Main Content Section -->
  <!-- This <slot/> content is NOT rendered by the server initially -->
  <!-- It's only rendered when isPageReady becomes true -->
  {#if isPageReady}
    <!-- Use #key block to ensure fade-in animation runs when content appears -->
    {#key isPageReady}
      <div class="content-fade-in">
        <slot />
      </div>
    {/key}
  {/if}

</div>

<style>
  /* Optional: Add a subtle fade-in for the main content after preloader disappears */
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.fade-in-content {
		/* Only apply animation *after* navigation is complete */
		animation: fadeIn 0.5s ease-in forwards;
	}

	/* Ensure layout takes full height if needed */
	/* :global(body), :global(html), :global(#svelte) { height: 100%; } */
	/* div { width: 100%; } */
</style>



<!-- ___OLD___ REVIEW AND DELETE -->
<!-- <script>
  import { onMount } from 'svelte';
  import '../app.css';

  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
 
  injectAnalytics({ mode: dev ? 'development' : 'production' });
</script> -->

<!-- <div class="bg-black text-white flex justify-center gap-4 p-4 fixed top-0 left-0 right-0 font-sans">
  <a href="/" class="text-white no-underline">Home</a>
  <a href="/portfolio" class="text-white no-underline">Portfolio</a>
  <a href="/contacto" class="text-white no-underline">Contacto</a>
</div> -->

<!-- <div class="body-bg flex items-center justify-center min-h-screen">
  <slot />
</div>


<style>
  .body-bg  {
    /* background: linear-gradient(to bottom, #0f0f0f 0%, #2d2d2d 100%), linear-gradient(to top, rgb(15, 15, 15) 0%, rgba(204, 185, 185, 0.25) 100%); */
    background: linear-gradient(to bottom, #2d2d2d 0%, rgb(19, 19, 19) 100%);
    
    background-blend-mode: multiply;  
  }  
</style> -->