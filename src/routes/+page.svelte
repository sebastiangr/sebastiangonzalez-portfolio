<script lang="ts">
	import Home from '$lib/sections/Home.svelte';
	import AboutMe from '$lib/sections/AboutMe.svelte';
	import Portfolio from '$lib/sections/Portfolio.svelte';
	import Skills from '$lib/sections/Skills.svelte';
	import Contact from '$lib/sections/Contact.svelte';
	import FullScreenMenu from '$lib/components/FullScreenMenu.svelte';
	import { isMenuOpen, toggleMenu } from '$lib/stores/menuStore';

  // Placeholder for Hamburger
  function PlaceholderHamburger() {
    return `<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>`;
  }
</script>

<svelte:head>
	<title>sebastiangonzalez.co - Portfolio</title>
	<meta name="description" content="Freelance fullstack and app developer." />
</svelte:head>

<!-- <main class="page-content" class:blurred={isMenuOpen}> -->
<main class="overflow-hidden">
	<!-- The Home section is fixed and covers the screen initially (z-10) -->
  <!-- Hamburger Menu Button -->

  <!-- <div class="fixed top-0 right-0 p-4 z-50"> -->
    <!-- <button
      on:click={toggleMenu}
      class="bg-white p-2 rounded-md hover:bg-white focus:outline-none 
      focus:ring-2 focus:ring-inset focus:ring-white z-50"
      aria-label="Open main menu" >
        {@html PlaceholderHamburger()}
    </button> -->

    <!-- Hamburger test -->
    <!-- <div class="menu-icon"> -->
      <!-- <button class="menu-icon__checkbox" on:click={toggleMenu} aria-label="Open main menu">  </button> -->
      <!-- <button class="menu-icon__checkbox" aria-label="Open main menu">  </button> -->
      <!-- <div>
        <span></span>
        <span></span>
      </div>
    </div>

  </div> -->

  <!-- <FullScreenMenu /> -->

  <Home />

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
  <div class="main-container {$isMenuOpen ? 'blurred' : ''} relative z-20 mt-[100vh]"> >
    <AboutMe />
    <Portfolio />
    <Skills />
    <Contact />
  </div>

	<!-- The Full Screen Menu (conditionally rendered via store) -->
	<FullScreenMenu />
</main>

<!-- Styles for this page layout (optional, can go in app.css) -->
<style>

  .main-container {
    background-color: var(--color-black, #121212);
    filter: blur(0px);
    -webkit-filter: blur(0px);
    -moz-filter: blur(0px);
    -o-filter: blur(0px);
    -ms-filter: blur(0px);
    transition: filter 0.6s ease; /* Adjust duration as needed */
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






</style>

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
