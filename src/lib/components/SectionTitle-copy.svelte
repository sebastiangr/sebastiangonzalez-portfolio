<script lang="ts">
	import TypewriterCore from "typewriter-effect/dist/core.js";
  import { browser } from '$app/environment';
  import { gsap } from 'gsap';

  // --- TYPEWRITER EFFECT --- //
  let { 
    number = "00", 
    title = "Hello!", 
    align = "centered", 
    speedNumber = "1.0", 
    speedTitle = "1.0" 
  } = $props();


  // --- TYPEWRITER EFFECT --- //
  // Text to be typed out by the typewriter effect  
  let textToWrite = title;

  let typewriterElement: HTMLSpanElement | undefined;
  // Use InstanceType because TypewriterCore is the constructor (value),
  // and we need the type of objects it creates.
  let typewriterInstance: InstanceType<typeof TypewriterCore> | undefined;

  let numberElement: HTMLElement | undefined = $state(); // Use $state for element binding in Svelte 5


  $effect(() => {

    // --- GSAP HOVER ANIMATION --- //
    if (browser && numberElement) {
			// Make sure numberElement isn't null before assigning listeners
			const currentNumberElement = numberElement; // Create stable reference inside closure

			const moveDistance = 20;
      const durationEnter = 0.6;
      const durationLeave = 0.5;

      // Type the event parameter as MouseEvent
			const handleMouseEnter = (event: MouseEvent): void => {
        // Kill any active leave animation immediately
        gsap.killTweensOf(currentNumberElement);

        const rect = currentNumberElement.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const deltaX = mouseX - elCenterX;
        const deltaY = mouseY - elCenterY;
        const angle = Math.atan2(deltaY, deltaX);

        const targetX = Math.cos(angle) * -moveDistance;
        const targetY = Math.sin(angle) * -moveDistance;

				gsap.to(currentNumberElement, {
					x: targetX,
					y: targetY,
					duration: durationEnter,
					ease: 'power2.out',
					overwrite: true
				});
      };

			// No event parameter needed here
			const handleMouseLeave = (): void => {
				// Kill any active enter animation immediately
        gsap.killTweensOf(currentNumberElement);

				gsap.to(currentNumberElement, {
					x: 0,
					y: 0,
					duration: durationLeave,
					ease: 'elastic.out(1, 0.7)',
          overwrite: true
				});
			};      

      // Add event listeners
			currentNumberElement.addEventListener('mouseenter', handleMouseEnter);
			currentNumberElement.addEventListener('mouseleave', handleMouseLeave);

            // --- Cleanup ---
			// Return cleanup function
			// return () => {
      //   // Check element still exists (though usually will if component is unmounting)
      //   // No need for 'currentNumberElement' here, the original 'numberElement' scope works
      //   if (numberElement) {
      //     numberElement.removeEventListener('mouseenter', handleMouseEnter);
      //     numberElement.removeEventListener('mouseleave', handleMouseLeave);
      //     gsap.killTweensOf(numberElement);
      //   }
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

    return undefined; // Explicitly return undefined or void
  });


</script>

<div class="title-wrapper {align}" >
  <span class="title-number" data-speed="{speedNumber}" bind:this={numberElement}>
    {number}
  </span>
  <h1 class="title-text" data-speed="{speedTitle}">
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

    span {
      color: var(--color-red); /* Example color */

      &.type {
        color: 1px var(--color-white);
      }
    }
  }
</style>