<script lang="ts">
	import TypewriterCore from "typewriter-effect/dist/core.js";
  import { browser } from '$app/environment';
  import { gsap } from 'gsap';

	// --- Constants for Glitch Effect ---
	const GLITCH_DURATION = 1; // Total time for the effect (seconds)
	const NUMBER_OF_CHANGES = 15; // How many random numbers to show
	const INTERVAL = GLITCH_DURATION / NUMBER_OF_CHANGES; // Time between each number change

  // --- TYPEWRITER EFFECT --- //
	// --- Props & Types (assuming previous setup) ---
	type AlignOptions = 'start' | 'centered' | 'end';
	type Props = {
		number?: string;
		title?: string;
		align?: AlignOptions;
		speedNumber?: number | string;
		speedTitle?: number | string;
	}  
	let {
		number: initialNumberProp = '00', // Use prop for initial value
		title = 'Default Title',
		align = 'start',
		speedNumber: rawSpeedNumber = 1.0,
		speedTitle: rawSpeedTitle = 1.0
  } = $props();


	const defaultSpeed = 1.0;
	function parseAndValidateSpeed(value: number | string | undefined | null): number {
		if (value === undefined || value === null) return defaultSpeed;
		const parsed = parseFloat(value.toString());
		return isNaN(parsed) ? defaultSpeed : parsed;
	}
	let finalSpeedNumber: number = $derived( parseAndValidateSpeed(rawSpeedNumber) );
	let finalSpeedTitle: number = $derived( parseAndValidateSpeed(rawSpeedTitle) );

	// --- Element Bindings ---
	let numberElement = $state<HTMLSpanElement | null>(null);
  let typewriterElement = $state<HTMLSpanElement | null>(null);

	// --- GSAP Glitch Effect Logic using Timeline ---
  let glitchTimeline = $state<gsap.core.Timeline | null>(null); // Store the active timeline
  let originalNumberText = $state<string>('');

  // Helper to format numbers (e.g., 7 -> "07", 12 -> "12")
  function formatNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  // Function to set a random number
  function setRandomNumber(element: HTMLSpanElement | null): void {
    if (!element) return;
    const randomNum = Math.floor(Math.random() * 100);
    element.textContent = formatNumber(randomNum);
  }

  // Function to set the final target number
  function setFinalNumber(element: HTMLSpanElement | null, finalNumText: string): void {
    if (!element) return;
    element.textContent = finalNumText;
  }

  // --- TYPEWRITER EFFECT --- //
  // Text to be typed out by the typewriter effect  
  let textToWrite = title;

  // Use InstanceType because TypewriterCore is the constructor (value),
  // and we need the type of objects it creates.
  let typewriterInstance: InstanceType<typeof TypewriterCore> | undefined;

  $effect(() => {

    if (browser && numberElement) {
			const currentNumberElement = numberElement;

      originalNumberText = formatNumber(parseInt(initialNumberProp, 10) || 0);
      if (currentNumberElement.textContent !== originalNumberText) {
        currentNumberElement.textContent = originalNumberText;
      }

			const handleMouseEnter = (): void => {
        // Kill existing timeline if any, and clear the reference
        if (glitchTimeline) {
          glitchTimeline.kill();
          glitchTimeline = null;
        }

        // Store the current text as original for this hover instance
        originalNumberText = currentNumberElement.textContent || formatNumber(parseInt(initialNumberProp, 10) || 0);
        const originalNum = parseInt(originalNumberText, 10);
        if (isNaN(originalNum)) {
          console.error("Could not parse original number:", originalNumberText);
          return;
        }
        const targetNum = originalNum;
        const targetNumText = formatNumber(targetNum);

      // Create the timeline, initially paused
        glitchTimeline = gsap.timeline({
          paused: true,
          onComplete: () => {
            glitchTimeline = null; // Clear reference on completion
          }
        });

        // Add calls to setRandomNumber at intervals
        for (let i = 0; i < NUMBER_OF_CHANGES; i++) {
          glitchTimeline.call(setRandomNumber, [currentNumberElement], i * INTERVAL);
          // The time parameter places the call at that specific time in the timeline
        }

        // Add a final call to set the target number at the end of the duration
        glitchTimeline.call(setFinalNumber, [currentNumberElement, targetNumText], GLITCH_DURATION);

        // Play the timeline
        glitchTimeline.play();
			};

			const handleMouseLeave = (): void => {
				// Kill the timeline if it's running
				if (glitchTimeline) {
					glitchTimeline.kill();
          glitchTimeline = null;
				}
				// Immediately revert to the original number
				currentNumberElement.textContent = originalNumberText;
			};

			// Add event listeners
			currentNumberElement.addEventListener('mouseenter', handleMouseEnter);
			currentNumberElement.addEventListener('mouseleave', handleMouseLeave);

			// --- Cleanup ---
			// return () => {
			// 	currentNumberElement.removeEventListener('mouseenter', handleMouseEnter);
			// 	currentNumberElement.removeEventListener('mouseleave', handleMouseLeave);
			// 	// Kill any active timeline when the component unmounts
			// 	glitchTimeline?.kill();
      //   glitchTimeline = null;
			// };
		}

    // Typewriter Effect
    if (typewriterElement && typeof TypewriterCore === 'function') {
      try {
        // Initialize using the imported core class
        typewriterInstance = new TypewriterCore(typewriterElement, {
          // --- Add your desired options ---
          // strings: ["About Me"],
          autoStart: true,
          loop: false,
          delay: 75,
          // deleteSpeed: 50,
          wrapperClassName: 'Typewriter__wrapper', // Example class
          cursorClassName: 'Typewriter__cursor',   // Example class
          callback: () => {
            console.log('Typewriter finished writing!');
            // You can add code here to stop the typewriter or perform any other action
          },
          // --- End Options ---
        });

        typewriterInstance
          .pauseFor(2000)
          .typeString(textToWrite)
          .start();

        // Check if instance seems valid (basic check for methods)
        if (typewriterInstance && typeof typewriterInstance.start === 'function' && typeof typewriterInstance.stop === 'function') {
          console.log('✅ Typewriter instance looks correct! Methods found.');
        } else {
          console.error('❌ Instance created from core import lacks expected methods!', typewriterInstance);
        }

      } catch (error) {
        console.error('❌ Error during Typewriter initialization (core import):', error);
      }
    } else if (!typewriterElement) {
      console.error('❌ typewriterElement is NOT found when onMount ran!');
    } else {
      console.error('❌ TypewriterCore (from import) is not a function/constructor!', TypewriterCore);
    }
    
    // --- Cleanup function for $effect ---
    return () => {
      console.log('Cleaning up effects');

      // Stop typewriter (optional, but good practice)
      if (typewriterInstance) {
        // Check if stop method exists and use it
        if (typeof (typewriterInstance as any).stop === 'function') {
          (typewriterInstance as any).stop();
        }
        typewriterInstance = undefined; // Clear the instance
      }
    }

    // return undefined; // Explicitly return undefined or void
  });


</script>

<div class="title-wrapper {align}" >
  <span class="title-number" data-speed="{finalSpeedNumber}" bind:this={numberElement}>
    { formatNumber(parseInt(initialNumberProp, 10) || 0) }
  </span>
  <h1 class="title-text" data-speed="{finalSpeedTitle}">
    <span>&lt;</span> <span class="type" bind:this={typewriterElement}></span><span>&nbsp;/&gt;</span>
  </h1>
</div>

<style lang="scss">
  .title-wrapper {
    display: flex;
    align-items: center;
    // gap: 1rem;
    font-variant-ligatures: none;
    margin-bottom: 20px;
    margin-top: 20px;    
    height: 200px;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    &.centered {
      justify-content: center; /* Horizontally center items */

      & h1 {
        padding-left: 0;
      }
    }
    &.start {
      justify-content: flex-start; /* Horizontally center items */
      
      & h1 {
        padding-left: 85px;
      }
    }
    &.end {
      justify-content: flex-end; /* Horizontally center items */
      
      & h1 {
        padding-left: 0;
        padding-right: 85px;
      }
    }
  }
  span.title-number {
    position: absolute;
    font-family: var( --main-font), sans-serif;    
    font-size: 12rem;
    font-weight: bold;
    -webkit-text-stroke: 2px var(--color-red);
    color: transparent;
    opacity: 0.5;  
  }
  h1.title-text {
    position: relative;
    font-size: 2.5rem;
    font-style: italic;
    font-weight: 500;
    color: var( --color-white); /* Example color */
    pointer-events: none;

    span {
      color: var(--color-red); /* Example color */

      &.type {
        color: 1px var(--color-white);
      }
    }
  }
</style>