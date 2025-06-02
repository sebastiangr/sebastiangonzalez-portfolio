<script lang="ts">
  import { isMenuOpen, toggleMenu } from '$lib/stores/menuStore';
  import { fade } from 'svelte/transition';
  import ArrowDown from "$lib/assets/arrow-down.svg";
  import { gsap } from 'gsap'; // <-- Import GSAP

  import TypewriterCore from 'typewriter-effect/dist/core.js';


  console.log('>>> Log Imported Core:', TypewriterCore);
  let typewriterElement: HTMLSpanElement | undefined;

  // Use InstanceType because TypewriterCore is the constructor (value),
  // and we need the type of objects it creates.
  let typewriterInstance: InstanceType<typeof TypewriterCore> | undefined;

  $effect(() => {
    console.log('onMount triggered.');

    // Ensure the element exists AND the imported core is a function (constructor)
    if (typewriterElement && typeof TypewriterCore === 'function') {
      console.log('✅ typewriterElement found:', typewriterElement);
      try {
        console.log('Attempting to initialize Typewriter with TypewriterCore from typewriter-effect/dist/core...');

        // Initialize using the imported core class
        typewriterInstance = new TypewriterCore(typewriterElement, {
          // --- Add your desired options ---
          strings: ["Web Developer", "Graphic Designer", "Freelancer", "Full-Stack Developer", "Svelte Developer", "Node.js Developer"],
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
          wrapperClassName: 'Typewriter__wrapper', // Example class
          cursorClassName: 'Typewriter__cursor',   // Example class
          // --- End Options ---
        });

        console.log('>>> Log Initialized Instance (from core):', typewriterInstance); // Check this object in console

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

    // Cleanup function
    return () => {
      console.log('Component destroying, stopping typewriter...');
      if (typewriterInstance && typeof typewriterInstance.stop === 'function') {
        try {
          typewriterInstance.stop();
          console.log('✅ Typewriter stopped.');
        } catch(e) { console.error("Error stopping typewriter:", e); }
      } else {
        console.log('No valid typewriter instance to stop or stop method missing.');
      }
    };
  });

  // Effect for GSAP Parallax
  $effect(() => {
    console.log('Parallax effect: Initializing.');

    const homeSectionEl: HTMLElement | null = document.getElementById('home');
    const h2TextEl: HTMLElement | null = document.querySelector('.home-wrapper h2.text');
    const h1TitleEl: HTMLElement | null = document.querySelector('.home-wrapper h1.home-text-title');
    const spanDescriptionEl: HTMLElement | null = document.querySelector('.home-wrapper span.home-text-description');

    const bgImageEl: HTMLElement | null = document.querySelector('.background-image');
    const bgOverlay: HTMLElement | null = document.querySelector('.background-overlay');
    const bgOverlay2: HTMLElement | null = document.querySelector('.background-overlay2');
    if (!bgImageEl) {
      console.error("❌ Parallax: Background image element not found. Effect disabled.");
      return;
    }

    // --- Element Checks ---
    // if (!homeSectionEl) {
    //   console.error("❌ Parallax: #home element not found. Effect disabled.");
    //   return; // Critical element missing
    // }
    // console.log('✅ Parallax: #home found.');

    // Log status of other elements
    if (h2TextEl) console.log('✅ Parallax: h2.text found.');
    else console.warn("⚠️ Parallax: .home-wrapper h2.text NOT found. Its parallax will be skipped.");

    if (h1TitleEl) console.log('✅ Parallax: h1.home-text-title found.');
    else console.warn("⚠️ Parallax: .home-wrapper h1.home-text-title NOT found. Its parallax will be skipped.");

    if (spanDescriptionEl) console.log('✅ Parallax: span.home-text-description found.');
    else console.warn("⚠️ Parallax: .home-wrapper span.home-text-description NOT found. Its parallax will be skipped.");

    // Initial background position from CSS for #home is 'center top' (50% 0%)
    const initialBgX = "50%";
    const initialBgY = "0%";


    const executeParallax = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window; // Using viewport as the reference container

      // Normalize mouse position relative to viewport center. Output range: -0.5 to 0.5
      const normalizedX = (clientX - innerWidth / 2) / innerWidth;
      const normalizedY = (clientY - innerHeight / 2) / innerHeight;

      // --- Define movement factors (total pixel travel distance for an element) ---
      // A positive value moves the element in the same direction as the mouse relative to the center.
      // A negative value moves it in the opposite direction.
      // Example: movement = 100 means element moves -50px to +50px.
      const bgMovement = -50;       // Background: moves +/-30px. Negative makes it recede.
      const bgOverlayMovement = -30; // Background overlay: moves +/-30px. Negative makes it recede.
      const bgOverlayMovement2 = 20; // Background overlay: moves +/-30px. Negative makes it recede.
      const h2TextMovement = -25;    // Typewriter H2: moves +/-15px
      const h1TitleMovement = -20;  // Title H1: moves +/-10px, opposite direction
      const spanDescMovement = -15;  // Description: moves +/-7.5px

      // 1. Parallax for #home background
      const bgOffsetX = normalizedX * bgMovement;
      const bgOffsetY = normalizedY * bgMovement; // Using same factor for Y for consistent bg movement

      // 2. Parallax for #home background overlay
      const bgOverlayOffsetX = normalizedX * bgOverlayMovement;
      const bgOverlayOffsetY = normalizedY * bgOverlayMovement; // Using same factor for Y for consistent bg movement      

      // 2. Parallax for #home background overlay
      const bgOverlayOffsetX2 = normalizedX * bgOverlayMovement2;
      const bgOverlayOffsetY2 = normalizedY * bgOverlayMovement2; 

      // TODO: Elegir backgrounds definitivos
      gsap.to(bgImageEl, {
        x: bgOffsetX,
        y: bgOffsetY,
        scale: 1.1, // Keep the background slightly scaled up
        duration: 1, // Smooth, slightly lagging animation
        ease: 'power2.out',
        overwrite: 'auto' // Essential for smooth updates on rapid mouse moves
      });

      gsap.to(bgOverlay, {
        x: bgOverlayOffsetX,
        y: bgOverlayOffsetY,
        scale: 1.1, // Keep the background slightly scaled up
        duration: 1, // Smooth, slightly lagging animation
        ease: 'power2.out',
        overwrite: 'auto' // Essential for smooth updates on rapid mouse moves
      });     
      
      gsap.to(bgOverlay2, {
        x: bgOverlayOffsetX2,
        y: bgOverlayOffsetY2,
        scale: 1.1, // Keep the background slightly scaled up
        duration: 1, // Smooth, slightly lagging animation
        ease: 'power2.out',
        overwrite: 'auto' // Essential for smooth updates on rapid mouse moves
      });         

      // TODO: Elegir si efecto parallax o onhover para los elementos de texto.
      // // 2. Parallax for h2.text
      if (h2TextEl) {
        gsap.to(h2TextEl, {
          // x: normalizedX * h2TextMovement,
          // y: normalizedY * h2TextMovement,
          opacity: 0, // Apply opacity when the item is going out of the scroll trigger
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
          paused: true, // Controlled by ScrollTrigger
          scrollTrigger: {
            trigger: bgImageEl,
            start: 'center 50%',
            end: 'top 10%',
            scrub: 1,
            // markers: true, // Uncomment for debugging
            once: true,
          }
          // scrollTrigger: {
          //   trigger: h2TextEl,
          //   start: 'top 80%',
          //   end: 'bottom 50%',
          //   scrub: 1,
          //   markers: true, // Uncomment for debugging
          //   once: true,
          //   onLeave: () => gsap.to(h2TextEl, { opacity: 0 }), // Set opacity to 0 when leaving
          //   onEnterBack: () => gsap.to(h2TextEl, { opacity: 1 }), // Restore opacity on enter
          // }
        });
      }

      // 3. Parallax for h1.home-text-title
      if (h1TitleEl) {
        gsap.to(h1TitleEl, {
          // x: normalizedX * h1TitleMovement,
          // y: normalizedY * h1TitleMovement,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: bgImageEl,
            start: 'center 50%',
            end: 'top 40%',
            scrub: 1,
            // markers: true, // Uncomment for debugging
            once: true,
          }
        });
      }

      // 4. Parallax for span.home-text-description
      if (spanDescriptionEl) {
        gsap.to(spanDescriptionEl, {
          // x: normalizedX * spanDescMovement,
          // y: normalizedY * spanDescMovement,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: bgImageEl,
            start: 'center 50%',
            end: 'top 40%',
            scrub: 1,
            // markers: true, // Uncomment for debugging
            once: true,
          }
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Optional: Throttling like the jQuery example.
      // If you find the animation too busy, you can enable this.
      // clearTimeout(parallaxThrottleTimeoutId);
      // parallaxThrottleTimeoutId = window.setTimeout(() => executeParallax(event), 50); // 50ms delay, adjust as needed

      // Direct execution (often preferred with GSAP's overwrite and duration)
      executeParallax(event);
    };

    window.addEventListener('mousemove', handleMouseMove);
    console.log('✅ Parallax: Mousemove listener added.');

    // Cleanup function: runs when the component is unmounted
    // return () => {
    //   console.log('Parallax effect: Cleaning up.');
    //   window.removeEventListener('mousemove', handleMouseMove);

    //   // Optional: Reset elements to their initial state smoothly
    //   gsap.to(homeSectionEl, {
    //     backgroundPositionX: initialBgX,
    //     backgroundPositionY: initialBgY,
    //     duration: 0.5,
    //     ease: 'power2.out'
    //   });
    //   gsap.to([h2TextEl, h1TitleEl, spanDescriptionEl], {
    //     x: 0,
    //     y: 0,
    //     duration: 0.5,
    //     ease: 'power2.out'
    //   });
    //   console.log('✅ Parallax: Mousemove listener removed and positions reset.');
    // };
  });




</script>

<section
  id="home"
  class="{$isMenuOpen ? 'blurred' : ''} absolute inset-0 h-screen w-screen z-10 flex flex-col justify-between" >

  <!-- Background wrapper -->
  <!-- TODO: Add preload to images -->
  <div class="background-wrapper">
    <div class="background-image"></div>
    <div class="background-overlay"></div>
    <div class="background-overlay2"></div>
  </div>

  <div class="home-gradient-wrapper">
    <div class="home-gradient"></div>
  </div>

  <div transition:fade class="home-wrapper flex flex-col text-left flex-grow -mt-16">

    <h2 class="home-text-type" data-speed="1.2"><span bind:this={typewriterElement}></span></h2>
    <h1 class="home-text-title" data-speed="1.15">SEBASTIÁN GONZÁLEZ</h1>
    <span class="home-text-description" data-speed="1.1">
      Crafting digital experiences that blend technical precision with creative design.
      <!-- Specialized in Svelte, Flutter, and WordPress solutions. -->
      <!-- Full-Stack Developer and Graphic Designer with 14+ years of experience. I combine strong technical knowledge with a background in graphic design,
      allowing me to <i>create functional</i> and aesthetically pleasing interfaces from conception to deployment. -->
    </span>

    <!-- Add maybe a subtle down arrow hint -->
    <!-- <div class="absolute bottom-10 left-0 transform  animate-bounce">      
      <img src="{ArrowDown}" alt=" Arrow Down" class="h-10 w-auto"/>
    </div> -->
  </div>
</section>

<style lang="scss">

  #home {
    // background-image: url('/background/bg-block_02.jpg');
    background-position: center top;
    background-size: cover;
  }

  .background-wrapper {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: -1; /* Ensure it stays behind other content */
  }

  .background-image {
    position: absolute;
    inset: 0;
    background-image: url('/background/bg-block_02.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transform: scale(1.1);
    will-change: transform;
  }

  .background-overlay {
    position: absolute;
    inset: 0;
    background-image: url('/background/bg-overlay.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transform: scale(1);
    will-change: transform;
    mix-blend-mode: lighten;
  }

  .background-overlay2 {
    position: absolute;
    inset: 0;
    background-image: url('/background/bg-overlay-2.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transform: scale(1);
    will-change: transform;
    opacity: 0.3;
    mix-blend-mode: plus-lighter;
  }  

  .home-wrapper {
    position: absolute;
    z-index: 99;
    margin-left: 80px;
    margin-bottom: 80px;
    margin-right: 0;
    bottom: 0;    

    @media screen and (max-width: 64rem) {
      margin-left: 60px;
      margin-bottom: 80px; 
      margin-right: 80px;
    }
    @media screen and (max-width: 48rem) {
      margin-left: 40px;
      margin-right: 80px;
      margin-bottom: 80px; 
    }
    @media screen and (max-width: 40rem) {
      margin-left: 30px;
      margin-right: 60px;
      margin-bottom: 60px; 
    }
  }
  .home-gradient-wrapper {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    justify-content: end;    
  }
  .home-gradient {
    background: linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 0) 20%, rgba(18, 18, 18, 0.7) 50%, rgb(18, 18, 18,1) 80%, rgb(18, 18, 18,1) 100%);
    background-position-x: 0%;
    background-position-y: 0%;
    background-position-x: 0%;
    background-position-y: 0%;
    height: 180px;
    position: relative;
    top: 0;
    left: 0;
    background-position: center center;
    z-index: 20;
    width: 100%;
  }

  h1.home-text-title {
    font-family: var(--geometria-font);
    font-size: 4rem;
    font-weight: 700;
    color: var(--color-red);
    // text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
    line-height: 1.2;
    letter-spacing: 0.2rem;
    transition: font-size 0.3s ease-in-out;
    animation: fadeIn 2s ease-out forwards;
    // opacity: 0; /* Start hidden */
    @media screen and (max-width: 80rem) {
      font-size: 3.5rem;  
    }
    @media screen and (max-width: 64rem) {
      font-size: 2.5rem;  
    }
    // @media screen and (max-width: 48rem) {
    //   font-size: 2rem;
    // }
    // @media screen and (max-width: 40rem) {
    //   font-size: 2.5rem;
    // }    
  }
  h2.home-text-type {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--color-white);
    line-height: 1.2;
    letter-spacing: 0.1rem;
    transition: font-size 0.3s ease-in-out;
    animation: fadeIn 2s ease-out forwards;
    opacity: 0; /* Start hidden */
    @media screen and (max-width: 80rem) {
      font-size: 2.5rem;  
    }
    @media screen and (max-width: 64rem) {
      font-size: 2rem;  
    }
    @media screen and (max-width: 48rem) {
      font-size: 1.8rem;
    }
    @media screen and (max-width: 40rem) {
      font-size: 1.5rem;
    }    
  }

  span.home-text-description {
    width: 60%;
    font-family: var(--main-font);
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--color-white);
    line-height: 1.5;
    margin-top: 1rem;
    transition: font-size 0.3s ease-in-out;
    animation: fadeIn 2s ease-out forwards;
    opacity: 0; /* Start hidden */
    @media screen and (max-width: 80rem) {
      font-size: 1.2rem;  
    }
    @media screen and (max-width: 64rem) {
      font-size: 1rem;  
      width: 60%;
    }
    @media screen and (max-width: 48rem) {
      font-size: 1rem;  
      width: 100%;
    }
    // @media screen and (max-width: 40rem) {
    //   font-size: 1.5rem;
    // }      
  }

  /* Your styles */
  /* Make sure cursor is visible */
  .Typewriter__cursor {
      color: cornflowerblue; /* Or any visible color */
      font-weight: bold;
  }
  /* Ensure the wrapper span (if typewriter adds one) is visible */
  .Typewriter__wrapper {
      color: inherit; /* Inherit text color from parent */
  }

  #home {    
    filter: blur(0px);
    -webkit-filter: blur(0px);
    -moz-filter: blur(0px);
    -o-filter: blur(0px);
    -ms-filter: blur(0px);
    transition: filter 0.6s ease; /* Adjust duration as needed */
  }  

  #home.blurred {
    filter: blur(6px);
    -webkit-filter: blur(6px);
    -moz-filter: blur(6px);
    -o-filter: blur(6px);
    -ms-filter: blur(6px);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translate3d(0, 40px, 0); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0; /* Start hidden */
  }
  .animation-delay-300 {
    animation-delay: 0.3s;
  }
  /* Add bounce animation if needed */
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
    40% {transform: translateY(-15px) translateX(-50%);}
    60% {transform: translateY(-7px) translateX(-50%);}
  }
  .animate-bounce {
    animation: bounce 2s infinite;
  }

</style>