<script lang="ts">
  // This section is for displaying skills and technologies.
  // You can customize the skills and their styles as per your preference.
  import Logo from "$lib/assets/sebastiangonzalez.co-logo.svg";
  import { isMenuOpen, toggleMenu } from '$lib/stores/menuStore';
  import { fade } from 'svelte/transition'; // Optional transition for elements

  // Placeholder for Logo
  function PlaceholderLogo() {
    return `<svg class="h-10 w-auto text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`;
  }
</script>

<section
  id="home"
  class="{$isMenuOpen ? 'blurred' : ''} fixed inset-0 h-screen w-screen z-10 flex flex-col justify-between  text-white p-6 sm:p-10"
>
<!-- bg-gradient-to-br from-gray-800 via-gray-900 to-black -->
  <!-- Header Row -->

  <!-- Optional: Centered content like Name/Title -->
  <div transition:fade class="flex flex-col items-center justify-center text-center flex-grow -mt-16">
    <h1 class="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
      Web Developer
    </h1>
    <p class="text-xl md:text-2xl text-gray-300 animate-fade-in-up animation-delay-300">Web Developer / Designer / Etc</p>
    <!-- Add maybe a subtle down arrow hint -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-500 animate-bounce">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
  </div>
   <!-- <div />  -->
   <!-- Dummy div to help justify-between -->
</section>

<!-- Basic Animation Styles (Add to app.css or a global style block) -->
<style>

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

  #home {
    /* background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
    background-blend-mode: multiply; */
    background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
    background-blend-mode: multiply,multiply;
  }
</style>
