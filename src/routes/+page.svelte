<script lang="ts">
	import Home from '$lib/sections/Home.svelte';
	import AboutMe from '$lib/sections/AboutMe.svelte';
	import Portfolio from '$lib/sections/Portfolio.svelte';
	import Skills from '$lib/sections/Skills.svelte';
	import Contact from '$lib/sections/Contact.svelte';
	import FullScreenMenu from '$lib/components/FullScreenMenu.svelte';
  import ArrowUp from "$lib/assets/arrow-up.svg";
  import ArrowDown from "$lib/assets/arrow-down.svg";
	import { isMenuOpen, toggleMenu } from '$lib/stores/menuStore';
	import Navigation from '$lib/components/Navigation.svelte';
  import { anchors, currentIndex } from "$lib/stores/navigationStore";
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import SectionT from '$lib/components/SectionT.svelte';
	import { browser } from '$app/environment';
  import { gsap } from 'gsap';

  import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
  import { smootherStore } from '$lib/stores/scrollSmootherStore'; // Import our new store
  // /**
  // * @type {globalThis.ScrollSmoother}
  // */
	// let smoother; // Variable to hold the ScrollSmoother instance

	let smoother: ScrollSmoother | null = null; // Variable to hold the ScrollSmoother instance

  $effect(() => {

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
      
			// If smoother was successfully created, update the store
			if (smoother) {
				smootherStore.set(smoother);
			}

      // --- Your other GSAP animations related to page scroll can go here ---
			// For example:
			// gsap.utils.toArray<HTMLElement>('section[id]').forEach(section => { // Target sections with an ID
			// 	gsap.fromTo(section,
			// 		{ opacity: 0, y: 50 },
			// 		{
			// 			opacity: 1,
			// 			y: 0,
			// 			duration: 0.8,
			// 			ease: 'power2.out',
			// 			scrollTrigger: {
			// 				trigger: section,
			// 				start: 'top 85%', // Start animation when 85% of the section is visible
			// 				toggleActions: 'play none none reverse', // Play on enter, reverse on leave
			// 			}
			// 		}
			// 	);
			// });
			// --- End of other GSAP animations ---

      // Return a cleanup function for when the component unmounts or $effect re-runs
			return () => {
				if (smoother) {
					smoother.kill(); // Important: kill the ScrollSmoother instance to prevent memory leaks
					smoother = null;  // Clear the local reference
				}
				smootherStore.set(null); // Reset the store

				// If you created other ScrollTriggers not directly managed by ScrollSmoother,
				// you might want to clean them up too, e.g., by collecting them or using ScrollTrigger.killAll()
				// However, ScrollSmoother.kill() usually cleans up ScrollTriggers it created.
				// Use ScrollTrigger.killAll() with caution if other parts of your app use ScrollTrigger independently.
			};
		} else {
			// If not in browser (e.g., SSR), ensure the store is null.
			// This might also be a place to set a default non-functional smoother if needed for type consistency,
			// but null is generally fine if components check for it.
			smootherStore.set(null);
			return () => {
				smootherStore.set(null); // Cleanup for the non-browser case
			};
		}


  });

  // $effect(() => {

  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + window.innerHeight / 2;
  //     const anchorList = get(anchors);

  //     if (window.scrollY === 0) {
  //       currentIndex.set(0);
  //       return;
  //     }

  //     const index = anchorList.findIndex((anchor) => {
  //       const section = document.querySelector(anchor);
  //       if (section) {
  //         const { top, height } = section.getBoundingClientRect();
  //         const sectionTop = top + window.scrollY;
  //         const sectionBottom = sectionTop + height;

  //         return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
  //       }
  //       return false;
  //     });

  //     if (index !== -1) {
  //       // console.log(`Current index: ${index}`);
  //       // console.log(`Current anchor: ${anchorList[index]}`);
  //       currentIndex.set(index);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  
</script>

<div id="preload">
  <img src="/background/bg-block_02.jpg" />
  <img src="/background/bg-overlay.png" />
  <img src="/background/bg-overlay-2.png" />
</div>

<FullScreenMenu />

<div id="smooth-wrapper" class="antialiased">
  <main id="smooth-content" class=""> 

    <div class="home-container" style="min-height: 100vh">
      <Home />
    </div>

    <div class="main-container {$isMenuOpen ? 'blurred' : ''} relative  ">

      <!-- <section id="about-me"><AboutMe /></section>
      <section id="portfolio"><Portfolio /></section>
      <section id="skills"><Skills /></section>
      <section id="contact"><Contact /></section> -->
  
      <section id="about-me" class="px-10 lg:px-16 xl:px-20">
        <div class="w-full mb-10" >
          <SectionT number="01" title="About Me" align="centered" speedNumber={0.85} speedTitle={0.92} />
        </div> 

        <div class="flex">
          <div class="about-me-text w-3/4">
            <p class="main-text">
              With over 14 years in digital development, I've evolved from WordPress specialist to full-stack developer with a passion for modern frameworks like Svelte and Flutter. My unique background combines technical development with formal design education, allowing me to build solutions that are both functionally robust and aesthetically refined. Currently focused on crafting custom web applications and mobile experiences using my growing stack of Svelte, PostgreSQL, and Node.js while contributing to open source initiatives.
            </p>
          </div>

          <div class="about-me-photo">
            <img src="/sebastian-gonzalez.jpg" alt="Sebastian Gonzalez" class="w-40 h-40 rounded-full mr-10" />
          </div>          
        </div>

      </section>


      <section id="portfolio" class="px-10 lg:px-16 xl:px-20">
        <!-- <div class="w-full mb-10" >
          <SectionT number="02" title="Portfolio" align="start" speedNumber={0.95} speedTitle={0.9} />
        </div>  -->

        <Portfolio />        

      </section>

      
      <section id="skills" >

        <div class="w-full mb-10 item  " >
          <SectionT number="03" title="Techs & Skills" align="end" speedNumber={0.9} speedTitle={0.95} />
        </div> 

        <Skills />

      </section>


      <section id="contact" >
        <div class="w-full mb-10" >
          <SectionT number="04" title="Contact" align="centered" speedNumber={0.95} speedTitle={0.9} />
        </div> 

        <Contact />

        <!-- <p class="text-lg text-gray-600 my-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p> -->
      </section>    
      
    </div>



  </main>
</div>



<style>

  /* Hide the preload images */
  div#preload {
    display: none;
  }

  main {
    background-color: var(--color-black, #121212);
  }

  section {
    /* scroll-snap-align: start;
    min-height: 100vh; */
  }

  #about-me {
    margin-top: 80px;

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


  .main-container {
    background-color: var(--color-black, #121212);
    filter: blur(0px);
    -webkit-filter: blur(0px);
    -moz-filter: blur(0px);
    -o-filter: blur(0px);
    -ms-filter: blur(0px);
    transition: filter 0.6s ease;
  }

  .main-container.blurred {
    filter: blur(6px);
    -webkit-filter: blur(6px);
    -moz-filter: blur(6px);
    -o-filter: blur(6px);
    -ms-filter: blur(6px);
  }

	/* Ensure the main content starts visually 'after' the fixed home screen */
	/* This isn't strictly needed because Home is fixed, but can help clarity */
	/* No explicit style needed here as the flow is natural with fixed Home */

  /* Styling the scrollbar subtly (optional) */
  :global(::-webkit-scrollbar) {
    width: 8px;
  }
  :global(::-webkit-scrollbar-track) {
    background: #111;
  }
  :global(::-webkit-scrollbar-thumb) {
    background: #222;
    border-radius: 4px;
  }
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #555;
  }

  /* Ensure body takes full height for scroll anchoring if needed, though usually default */
  :global(body) {
    /* No specific style usually needed here unless defaults were overridden */
  }


  .nav-container img {
    width: 40px;
    height: 40px;
    margin: 5px;
  }

</style>

<!-- OLD UNDER CONSTRUCTION PAGE -->
<!-- <script lang="ts">
  import Logo from "$lib/assets/sebastiangonzalez.co-logo.svg";
  import IconLinkedin from "$lib/assets/icon-linkedin.svg";
  import IconWhatsapp from "$lib/assets/icon-whatsapp.svg";
  import IconMail from "$lib/assets/icon-mail.svg";
  import IconGithub from "$lib/assets/icon-github.svg";
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Gelasio" rel="stylesheet">
</svelte:head>

<div class="text-center m-12">

  <img src={Logo} alt="Sebastian Gonzalez Logo" class="w-32 h-32 mx-auto mt-8 mb-8 transition duration-1000 ease-in-out hover:rotate-180" />

  <h1 class="text-2xl sm:text-4xl mb-4 uppercase">I'm Sebastián, <br>a freelance web and app developer</h1>
  <p class="animate-pulse mb-10">This web is under construction... come back soon</p>

  <h2 class="text-xl sm:text-2xl mt-8 mb-4">GET IN TOUCH</h2>
  <div class="flex justify-center">
    <a href="mailto:sebastiangr@proton.me" target="_blank" rel="noopener noreferrer" class="m-4 transition duration-500 ease-in-out hover:scale-110" aria-label="Send email">
      <img src={IconMail} alt="Email" width="40" height="40" />
    </a>
    <a href="https://wa.me/573003060724" target="_blank" rel="noopener noreferrer" class="m-4 transition duration-500 ease-in-out hover:scale-110" aria-label="Send WhatsApp message">
      <img src={IconWhatsapp} alt="WhatsApp" width="40" height="40" />
    </a>    
    <a href="https://github.com/sebastiangr" target="_blank" rel="noopener noreferrer" class="m-4 transition duration-500 ease-in-out hover:scale-110" aria-label="GitHub profile">
      <img src={IconGithub} alt="GitHub" width="40" height="40" />
    </a> 
    <a href="https://www.linkedin.com/in/sebastiangonzalez-co/" target="_blank" rel="noopener noreferrer" class="m-4 transition duration-500 ease-in-out hover:scale-110" aria-label="LinkedIn profile">
      <img src={IconLinkedin} alt="LinkedIn" width="40" height="40" />
    </a>
  </div>
</div> -->