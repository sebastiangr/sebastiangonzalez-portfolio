<script lang="ts">
  import { onMount, onDestroy } from 'svelte'; // Use onMount/onDestroy for setup/teardown
  import Rellax from 'rellax';
  import TypewriterCore from "typewriter-effect/dist/core.js";

  // --- Props (using Svelte 5 Runes) ---
  let { number, title, align } = $props();
  let textToWrite = title; // Use the title prop for the typewriter

  // --- Element References ---
  let typewriterElement: HTMLSpanElement | undefined = $state();
  let titleWrapperElement: HTMLDivElement | undefined = $state();
  let titleNumberElement: HTMLSpanElement | undefined = $state();
  let titleTextElement: HTMLHeadingElement | undefined = $state(); // Reference for Rellax

  // --- Typewriter State ---
  let typewriterInstance: InstanceType<typeof TypewriterCore> | undefined;

  // --- Rellax State ---
  // let rellaxInstance: Rellax | undefined;
  // Use InstanceType to get the type of the object created by `new Rellax()`
  let rellaxInstance: InstanceType<typeof Rellax> | undefined;

  // --- Effect 1: Fade-in/Appear on Scroll Action ---
  function appearOnScroll(node: HTMLElement, options = { threshold: 0.1 }) {
    let observer: IntersectionObserver;

    // Ensure the node starts hidden via CSS before observation starts
    if (!node.classList.contains('visible')) {
       // Add a class to mark it as needing animation, handled by CSS
       node.classList.add('appear-init');
    }

    function handleIntersect(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add('visible');
          node.classList.remove('appear-init'); // Remove initial state class
          // Optional: Stop observing once visible
          // observer.unobserve(node);
        } else {
          // Optional: Re-hide if it scrolls out of view
          // node.classList.remove('visible');
          // node.classList.add('appear-init');
        }
      });
    }

    // Use a small delay to ensure CSS is applied before observing
    const timeoutId = setTimeout(() => {
        observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(node);
    }, 50); // Small delay

    return {
      destroy() {
        clearTimeout(timeoutId);
        if (observer) {
          observer.unobserve(node);
          observer.disconnect();
        }
      }
    };
  }

  // --- Effect 2: Cursor Parallax (Hover) ---
  const hoverFactor = 0.03; // Adjust intensity

  function handleMouseMove(event: MouseEvent) {
    if (!titleWrapperElement || !titleNumberElement) return;

    const rect = titleWrapperElement.getBoundingClientRect();
    const mouseX = event.clientX - (rect.left + rect.width / 2);
    const mouseY = event.clientY - (rect.top + rect.height / 2);

    // Use CSS variables for hover transform
    titleNumberElement.style.setProperty('--hover-translate-x', `${mouseX * hoverFactor}px`);
    titleNumberElement.style.setProperty('--hover-translate-y', `${mouseY * hoverFactor}px`);
  }

  function handleMouseLeave() {
    if (!titleNumberElement) return;
    // Reset CSS variables
    titleNumberElement.style.setProperty('--hover-translate-x', `0px`);
    titleNumberElement.style.setProperty('--hover-translate-y', `0px`);
  }

  // --- Setup Effects (Typewriter & Rellax) using $effect ---
  $effect(() => {
    // --- Typewriter Initialization ---
    if (typewriterElement && !typewriterInstance) { // Initialize only once
      console.log('Initializing Typewriter');
      try {
        typewriterInstance = new TypewriterCore(typewriterElement, {
          autoStart: false, // Start manually after pause
          loop: false,
          delay: 75,
          wrapperClassName: 'Typewriter__wrapper',
          cursorClassName: 'Typewriter__cursor',
        });

        // Clear existing content before typing (optional, good practice)
        typewriterElement.innerHTML = '';

        typewriterInstance
          .pauseFor(1500) // Adjust pause if needed
          .typeString(textToWrite)
          .start();

      } catch (e) {
        console.error("Failed to initialize Typewriter:", e);
      }
    }

    // --- Rellax Initialization (Effect 3) ---
    // Check if elements exist and Rellax hasn't been initialized yet
    if (titleNumberElement && titleTextElement && !rellaxInstance) {
      console.log('Initializing Rellax');
      // Use specific element references for more robustness if needed,
      // or stick to the class selector if elements are guaranteed.
      // Using class selector here for simplicity:
      rellaxInstance = new Rellax('.rellax', {
        center: false,
        wrapper: undefined,
        round: true,
        vertical: true,
        horizontal: false
      });
    }

    // --- Initialize Hover Effect CSS Variables ---
    if (titleNumberElement) {
      handleMouseLeave(); // Set initial state
    }


    // --- Cleanup function for $effect ---
    return () => {
      console.log('Cleaning up effects');
      // Destroy Rellax instance
      if (rellaxInstance) {
        console.log('Destroying Rellax');
        rellaxInstance.destroy();
        rellaxInstance = undefined; // Clear the instance
      }
      // Stop typewriter (optional, but good practice)
      if (typewriterInstance) {
        // Check if stop method exists and use it
        if (typeof (typewriterInstance as any).stop === 'function') {
          (typewriterInstance as any).stop();
        }
        typewriterInstance = undefined; // Clear the instance
      }
    };
  });

  // Update typewriter text if the 'title' prop changes
  $effect(() => {
    if(typewriterInstance && textToWrite !== title) {
      console.log('Title prop changed, updating typewriter.');
      textToWrite = title;
      // Restart typewriter with new text
      if (typewriterElement) {
        typewriterElement.innerHTML = ''; // Clear previous
      }
      typewriterInstance
        .pauseFor(500) // Shorter pause for updates?
        .typeString(textToWrite)
        .start();
    }
  })

</script>

<!-- Apply appear action, hover listeners, and Rellax attributes -->
<div
  role="heading"
  aria-level="1"
  class="title-wrapper {align}"
  use:appearOnScroll
  bind:this={titleWrapperElement}
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
>
  <span
    class="title-number rellax"
    data-rellax-speed="-3"
    bind:this={titleNumberElement}
  >
    {number}
  </span>
  <h1
    class="title-text rellax"
    data-rellax-speed="-1"
    bind:this={titleTextElement}
  >
    <span>&lt;</span>
    <span class="type" bind:this={typewriterElement}></span>
    <span> &nbsp;/&gt;</span>
  </h1>
</div>

<style lang="scss">
  .title-wrapper {
    display: flex;
    align-items: center;
    font-variant-ligatures: none;
    margin-bottom: 20px;
    margin-top: 20px;
    height: 200px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    position: relative; /* Needed for absolute positioning of children and transforms */
    overflow: hidden; /* Hide parts moving outside during animation */
    padding: 20px 0; /* Ensure space for transforms */
    overflow: visible; /* Allow overflow for Rellax effect */


    // --- Effect 1: Appear Styling ---
    &.appear-init {
        opacity: 0;
        transform: translateY(30px); /* Start slightly below */
    }
    // Apply transition only when preparing to appear or appearing
    &.appear-init, &.visible {
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        transition-delay: 0.1s;
    }
    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
    // --- End Effect 1 Styling ---


    // --- Alignment Styling ---
    &.centered { // Changed from 'center' to match CSS
      justify-content: center;
       & .title-text { padding-left: 0; } // Target child class
       // Adjust title-number positioning if needed for centered layout
       & .title-number { left: 50%; transform: translateX(-50%) translate(var(--hover-translate-x, 0px), var(--hover-translate-y, 0px)); } // Center absolute element and add hover transform
    }
    &.start {
      justify-content: flex-start;
       & .title-text { padding-left: 85px; } // Keep original padding
       // Adjust title-number positioning if needed for start layout
       & .title-number { left: 0; /* Adjust as needed */ transform: translate(var(--hover-translate-x, 0px), var(--hover-translate-y, 0px)); } // Add hover transform
    }
    &.end {
      justify-content: flex-end;
      & .title-text { padding-left: 0; padding-right: 85px; } // Keep original padding
      // Adjust title-number positioning if needed for end layout
      & .title-number { right: 0; /* Adjust as needed */ transform: translate(var(--hover-translate-x, 0px), var(--hover-translate-y, 0px)); } // Add hover transform
    }
  }

  span.title-number {
    position: absolute; // Stays absolute
    font-family: var( --main-font), sans-serif;
    font-size: 12rem;
    font-weight: bold;
    -webkit-text-stroke: 2px var(--color-red);
    color: transparent;
    opacity: 0.5;
    z-index: 1; // Ensure it's behind text if overlapping

    // --- Effect 2: Cursor Hover Styling ---
    --hover-translate-x: 0px; /* CSS variable for hover X */
    --hover-translate-y: 0px; /* CSS variable for hover Y */
    /* Base transform includes the hover effect variables */
    /* Rellax will add its transform inline, potentially overriding parts if not careful */
    /* For absolute positioning, adjust base position in alignment styles above */
    transform: translate(var(--hover-translate-x), var(--hover-translate-y));
    transition: transform 0.15s ease-out; /* Smooth transition for hover */
  }

  h1.title-text {
    position: relative; // Keep relative for Rellax
    font-size: 2.5rem;
    font-style: italic;
    font-weight: 500;
    color: var( --color-white);
    z-index: 2; // Ensure text is above number
    display: inline-block; // Good for Rellax and text flow

    span {
      color: var(--color-red);
      display: inline-block; // Prevent wrapping issues

      &.type {
        color: var(--color-white); // Corrected color value
        min-height: 1.2em; // Prevent layout shift while typing
        min-width: 1px; // Prevent collapse before typing
        vertical-align: middle; // Align with surrounding spans
      }
    }
  }

  // --- Typewriter Cursor Styling (Example) ---
  .Typewriter__cursor {
    color: var(--color-red);
    font-weight: bold;
  }
</style>