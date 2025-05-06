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


  $effect(() => {

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const anchorList = get(anchors);

      if (window.scrollY === 0) {
        currentIndex.set(0);
        return;
      }

      const index = anchorList.findIndex((anchor) => {
        const section = document.querySelector(anchor);
        if (section) {
          const { top, height } = section.getBoundingClientRect();
          const sectionTop = top + window.scrollY;
          const sectionBottom = sectionTop + height;

          return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
        }
        return false;
      });

      if (index !== -1) {
        console.log(`Current index: ${index}`);
        console.log(`Current anchor: ${anchorList[index]}`);
        currentIndex.set(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });


  // SVELTE 4 - WORKING PARTIALLY
  // onMount(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + window.innerHeight / 2; // Use the middle of the viewport as the reference point
  //     const anchorList = get(anchors);

  //     // Handle the case where the user scrolls to the very top of the page
  //     if (window.scrollY === 0) {
  //       currentIndex.set(0); // Set index to 0 for the "Home" section
  //       return;
  //     }

  //     // Find the index of the section currently in view
  //     const index = anchorList.findIndex((anchor) => {
  //       const section = document.querySelector(anchor);
  //       if (section) {
  //         const { top, height } = section.getBoundingClientRect();
  //         const sectionTop = top + window.scrollY; // Absolute position of the section's top
  //         const sectionBottom = sectionTop + height;

  //         // Check if the scroll position is within the section's bounds
  //         return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
  //       }
  //       return false;
  //     });

  //     if (index !== -1) {
  //       // Update the current index
  //       console.log(`Current index: ${index}`);
  //       console.log(`Current anchor: ${anchorList[index]}`);
  //       currentIndex.set(index); // Update the global current index
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });






  // onMount(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + window.innerHeight / 2;

  //     console.log(`Scroll position: ${scrollPosition}`);

  //     // Update the current index based on the scroll position
  //     const anchorList = get(anchors);
  //     const index = anchorList.findIndex((anchor) => {
  //       const section = document.querySelector(anchor);
  //       if (section) {
  //         const { top, bottom } = section.getBoundingClientRect();
  //         return top <= scrollPosition && bottom > scrollPosition;
  //       }
  //       return false;
  //     });

  //     if (index !== -1) {
  //       console.log(`Current index: ${index}`);
  //       console.log(`Current anchor: ${anchorList[index]}`);
  //       currentIndex.set(index); // Update the global current index
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });
  
</script>

<svelte:head>
	<title>sebastiangonzalez.co - Portfolio</title>
	<meta name="description" content="Freelance fullstack and app developer." />
  <script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
</svelte:head>

<!-- <main class="page-content" class:blurred={isMenuOpen}> -->
<main class="overflow-hidden">
	<!-- The Home section is fixed and covers the screen initially (z-10) -->
  <!-- Hamburger Menu Button -->

  <!-- <Home /> -->
  <section ><Home /></section>

  <!-- Wrapper for the rest of the content -->
  <!--
        - relative: Establishes stacking context for z-index
        - z-20: Ensures this scrolls OVER the Home section (z-10)
        - mt-[100vh]: *** THIS IS THE KEY FIX ***
          Pushes this entire block down by the height of the viewport,
          so it visually starts AFTER the Home section.
        - bg-white:  Needed so this block's background obscures Home as it scrolls up.
                    Adjust if your first scrollable section (AboutMe) has a different
                    background you want shown immediately.
    -->
  <!-- <div class="main-container {$isMenuOpen ? 'blurred' : ''} relative z-20 mt-[100vh]"> > -->
  <div class="main-container {$isMenuOpen ? 'blurred' : ''} relative">
    <!-- <AboutMe />
    <Portfolio />
    <Skills />
    <Contact /> -->
    <section id="about-me"><AboutMe /></section>
    <section id="portfolio"><Portfolio /></section>
    <section id="skills"><Skills /></section>
    <section id="contact"><Contact /></section>
  </div>

  <Navigation />

	<!-- The Full Screen Menu (conditionally rendered via store) -->
	<FullScreenMenu />
</main>


<style>

  section {
    /* scroll-snap-align: start;
    min-height: 100vh; */
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