<script lang="ts">
  import TypewriterCore from "typewriter-effect/dist/core.js";
  import { browser } from '$app/environment';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';  



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
		speedNumber?: number;
		speedTitle?: number;
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
  let wrapperElement = $state<HTMLDivElement | null>(null); // The main .title-wrapper
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

  // --- Scroll-Reveal Animation ---
  let scrollRevealAnimation = $state<gsap.core.Tween | null>(null);

  // --- TYPEWRITER EFFECT --- //
  // Text to be typed out by the typewriter effect  
  let textToWrite = title;

  // Use InstanceType because TypewriterCore is the constructor (value),
  // and we need the type of objects it creates.
  let typewriterInstance: InstanceType<typeof TypewriterCore> | undefined;
  let hasTypewriterStarted = $state<boolean>(false); // Flag to prevent re-starting

  // --- Glitch Logic Handlers (as before) ---
  const handleMouseEnterForGlitch = (currentNumberElement: HTMLSpanElement): void => {
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

  const handleMouseLeaveForGlitch = (currentNumberElement: HTMLSpanElement): void => {
    // Kill the timeline if it's running
    if (glitchTimeline) {
      glitchTimeline.kill();
      glitchTimeline = null;
    }
    // Immediately revert to the original number
    currentNumberElement.textContent = originalNumberText;
  };    

  // FIX
  let hasPlayedAnimation = false;

  $effect(() => {
    if (!browser || !wrapperElement) {
      return; // Wait for browser and wrapper element
    }
    const currentWrapperElement = wrapperElement; // Stable reference

    // --- Initialize Scroll-Reveal Animation ---
    gsap.set(currentWrapperElement, { opacity: 0, y: 30 });
    // gsap.registerPlugin(ScrollTrigger);
    // Ensure ScrollTrigger is registered before using it
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother); // Uncomment if using ScrollSmoother

    scrollRevealAnimation = gsap.to(currentWrapperElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      paused: true, // Controlled by ScrollTrigger
      scrollTrigger: {
        trigger: currentWrapperElement,
        start: 'top 85%',
        once: true,
        // markers: true,
        onEnter: () => {
          if (!hasPlayedAnimation) {
            console.log('ScrollTrigger onEnter: Playing reveal animation and starting typewriter.');
            scrollRevealAnimation?.play();
            hasPlayedAnimation = true;

            // --- Start Typewriter on Scroll Reveal ---
            // Check if typewriter element exists and core is loaded
            if (typewriterElement && typeof TypewriterCore === 'function' && !hasTypewriterStarted) {
              try {
                // Ensure existing instance is stopped if any (though `once: true` should prevent re-trigger)
                if (typewriterInstance && typeof typewriterInstance.stop === 'function') {
                  typewriterInstance.stop();
                }

                typewriterInstance = new TypewriterCore(typewriterElement, {
                  autoStart: false, // We will start it manually
                  loop: false,
                  delay: 75,
                  wrapperClassName: 'Typewriter__wrapper',
                  cursorClassName: 'Typewriter__cursor',
                  // Remove callback from here if it causes issues with manual start
                });

                typewriterInstance
                  .pauseFor(100) // Short pause after reveal
                  .typeString(textToWrite)
                  .start()
                  .callFunction(() => { // Use callFunction for post-typing actions
                    console.log('Typewriter finished writing!');
                      // Optionally remove cursor after typing
                    if (typewriterElement?.querySelector('.Typewriter__cursor')) {
                      (typewriterElement.querySelector('.Typewriter__cursor') as HTMLElement).style.display = 'none';
                    }
                  }
                );

                hasTypewriterStarted = true; // Mark as started
                console.log('✅ Typewriter started on scroll reveal.');

              } catch (error) {
                console.error('❌ Error during Typewriter initialization on scroll reveal:', error);
              }
            } else if (!typewriterElement) {
              console.warn('Typewriter element not found when ScrollTrigger.onEnter fired.');
            } else if (hasTypewriterStarted) {
              console.log('Typewriter already started, skipping.');
            }
          };
        }
      }
    });

    // --- Glitch Effect Setup for numberElement (if it exists) ---
    if (numberElement) {
      const currentNumberElement = numberElement;
      originalNumberText = formatNumber(parseInt(initialNumberProp, 10) || 0);
      if (currentNumberElement.textContent !== originalNumberText) {
        currentNumberElement.textContent = originalNumberText;
      }
      const enterListener = () => handleMouseEnterForGlitch(currentNumberElement);
      const leaveListener = () => handleMouseLeaveForGlitch(currentNumberElement);
      currentNumberElement.addEventListener('mouseenter', enterListener);
      currentNumberElement.addEventListener('mouseleave', leaveListener);

      // Cleanup function for $effect
      return () => {
        console.log('Cleaning up GSAP animations and typewriter for wrapper:', currentWrapperElement.id || 'no-id');
        scrollRevealAnimation?.scrollTrigger?.kill();
        scrollRevealAnimation?.kill();
        scrollRevealAnimation = null;

        // Stop and clear typewriter if it exists
        if (typewriterInstance && typeof typewriterInstance.stop === 'function') {
          typewriterInstance.stop();
        }
        typewriterInstance = null;
        hasTypewriterStarted = false; // Reset flag

        // Cleanup glitch listeners
        currentNumberElement.removeEventListener('mouseenter', enterListener);
        currentNumberElement.removeEventListener('mouseleave', leaveListener);
        glitchTimeline?.kill();
        glitchTimeline = null;
      };
    } else {
      // Cleanup for only scroll reveal and typewriter if no glitch element
      return () => {
        console.log('Cleaning up GSAP animations and typewriter (no glitch) for wrapper:', currentWrapperElement.id || 'no-id');
        scrollRevealAnimation?.scrollTrigger?.kill();
        scrollRevealAnimation?.kill();
        scrollRevealAnimation = null;

        if (typewriterInstance && typeof typewriterInstance.stop === 'function') {
          typewriterInstance.stop();
        }
        typewriterInstance = null;
        hasTypewriterStarted = false;
      };
    }

  });

</script>

<div class="title-wrapper {align}"
  bind:this={wrapperElement}
  style="opacity: 0;"
  aria-live="polite"
  aria-atomic="true">
  <span class="title-number" data-speed="{finalSpeedNumber}" bind:this={numberElement}>
    { formatNumber(parseInt(initialNumberProp, 10) || 0) }
  </span>
  <h1 class="title-text" data-speed="{finalSpeedTitle}">
    <span>&lt;</span> <span class="type" bind:this={typewriterElement}></span><span>&nbsp;/&gt;</span>
  </h1>
</div>

<style lang="postcss">

  .title-wrapper {
    display: flex;
    align-items: center;
    /* gap: 1rem; */
    font-variant-ligatures: none;
    margin-bottom: 20px;
    margin-top: 20px;    
    padding-left: 6rem;
    padding-right: 6rem;
    height: 22rem;
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
    
    @media screen and (max-width: 64rem) {
      height: 10rem;
      margin-bottom: 10px;
      margin-top: 10px;        
      padding-left: 3rem;
      padding-right: 3rem;  
    }
    @media screen and (max-width: 48rem) {
       
      padding-left: 2rem;
      padding-right: 2rem;  
    }    
    @media screen and (max-width: 40rem) {
     
      padding-left: 1rem;
      padding-right: 1rem;  
    }        
  }
  span.title-number {
    position: absolute;
    font-family: var( --main-font), sans-serif;    
    font-size: 20rem;
    font-weight: bold;
    -webkit-text-stroke: 2px var(--color-red);
    color: transparent;
    opacity: 0.5;  
    transition: font-size 0.3s ease-in-out;  

    @media screen and (max-width: 80rem) {
      font-size: 16rem;        
    }
    @media screen and (max-width: 64rem) {
      font-size: 12rem;        
    }
    @media screen and (max-width: 48rem) {
      font-size: 10rem;        
    }  
    @media screen and (max-width: 40rem) {
      font-size: 8rem;        
    }       
  }
  h1.title-text {
    position: relative;
    font-size: 5rem;
    font-style: italic;
    font-weight: 500;
    color: var( --color-white); /* Example color */
    pointer-events: none;
    transition: font-size 0.3s ease-in-out;

    span {
      color: var(--color-red); /* Example color */

      &.type {
        color: 1px var(--color-white);
      }
    }

    @media screen and (max-width: 80rem) {
      font-size: 4rem;        
    }
    @media screen and (max-width: 64rem) {
      font-size: 3rem;        
    }
    @media screen and (max-width: 48rem) {
      font-size: 2.5rem;        
    }
    @media screen and (max-width: 40rem) {
      font-size: 2rem;        
    }    
  }
</style>