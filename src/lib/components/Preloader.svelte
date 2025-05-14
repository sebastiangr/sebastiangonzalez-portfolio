<script lang="ts">
  import Logo from "$lib/assets/sebastiangonzalez.co-logo.svg";
  // import Logo from "/images/sebastiangonzalez.co-logo.svg";
  import { fade, scale } from 'svelte/transition';

  let ellipsisStage = $state(0);
  let ellipsis = $derived('.'.repeat(ellipsisStage)); // Calculate ellipsis string

  $effect(() => {
    const interval = setInterval(() => {
      ellipsisStage = (ellipsisStage + 1) % 4; // Cycle through 0 to 3
    }, 600); // Change every 500ms

    return () => clearInterval(interval); // Cleanup on component destroy
  });

</script>


<!-- 
  Outermost container for the preloader.
  - `fixed inset-0`: Covers the entire viewport.
  - `bg-black/80`: Dark background with 80% opacity (Tailwind JIT feature). Adjust opacity (e.g., bg-black/90) if needed.
  - `z-50`: Ensures it's on top of other content.
  - `flex flex-col justify-center items-center`: Centers the content.
  - `transition:fade`: Applies fade effect for the background entry (duration controlled here).
  - `out:fade={{ duration: 300 }}`: Controls the fade-out when the preloader is removed.
-->
<div id="preloader" class="fixed inset-0 flex flex-col justify-center items-center"
  in:fade={{ duration: 200 }} out:fade={{ duration: 400 }} >
	<!-- 
    Inner container for the animated elements (logo and text).
    - `transition:fade` and `transition:scale`: Apply entrance animations.
    - `delay`: Delays the appearance of these elements slightly after the background fades in.
    - `duration`: Controls the speed of the entrance animations.
    - `start`: Sets the initial scale for the scale transition.
  -->
  <div class="flex flex-col items-center justify-center"
    in:scale={{ delay: 150, duration: 300, start: 0.8 }} >
		<!-- SVG Logo -->
    <div class="logo-loader animate-spin-slow">
      <img src={Logo} alt="sebastiangonzalez.co" class="" />
    </div>

		<!-- Loading Text -->
		<h1 class="text-xl md:text-2xl font-semibold text-gray-200 animate-flicker">
			Loading{ellipsis}
		</h1>
	</div>
</div>        
      <!-- <div class="logo-loader">
        <img src={Logo} alt="sebastiangonzalez.co" class="" />
      </div>
    </div>  -->



<style lang="scss">

  #preloader {
    background-color: var(--color-black);
  }

	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	.animate-spin-slow {
		animation: spin-slow 6s linear infinite;
	}

	@keyframes flicker {
		0%, 100% { opacity: 1; }
    	50% { opacity: 0.6; }
	}
  	.animate-flicker {
    	animation: flicker 1s infinite ease-in-out;
 	}

	/* Using ::after pseudo-element to replace the span content */
	.animate-dots::after {
		content: '.'; /* Initial content */
		animation: dots 1.5s steps(3, end) infinite; /* steps() creates the discrete typing effect */
		display: inline-block; /* Needed for content and layout */
		vertical-align: bottom; /* Align dots nicely */
		overflow: hidden; /* Hide intermediate steps */
		width: 1.2em; /* Adjust width to fit "..." */
		text-align: left; /* Keep dots aligned left */
	}
	/* Hide the original span content if using ::after */
	.animate-dots {
		font-size: inherit; /* Ensure font size matches parent */
		position: relative; /* Needed for pseudo-element positioning context if required */
		color: transparent; /* Hide the original "..." text */
	}

  
	/* Animation for the "..." */
	@keyframes dots {
		0%, 20% { content: '.'; }
		40%, 60% { content: '..'; }
		80%, 100% { content: '...'; }
	}

	/* Ensure Tailwind base styles are applied if not using a global css file */
	:global(:root) {
		--tw-bg-opacity: 1; /* Example Tailwind CSS variable */
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