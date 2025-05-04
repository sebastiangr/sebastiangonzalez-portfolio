<script lang="ts">
  // This section is for displaying skills and technologies.
  // You can customize the skills and their styles as per your preference.
  
  import { isMenuOpen, toggleMenu } from '$lib/stores/menuStore';
  import { fade } from 'svelte/transition'; // Optional transition for elements
  import ArrowDown from "$lib/assets/arrow-down.svg";

  import TypewriterCore from 'typewriter-effect/dist/core.js';


  console.log('>>> Log Imported Core:', TypewriterCore); // Verify: Should be the class constructor

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

</script>

<section
  id="home"
  class="{$isMenuOpen ? 'blurred' : ''} fixed inset-0 h-screen w-screen z-10 flex flex-col justify-between  text-white p-6 sm:p-10" >
<!-- bg-gradient-to-br from-gray-800 via-gray-900 to-black -->
  <!-- Header Row -->

  <!-- Optional: Centered content like Name/Title -->
  <div transition:fade class="flex flex-col items-center justify-center text-center flex-grow -mt-16">

    <h2 class="text-2xl sm:text-4xl mb-4">Hi!</h2>
    
    <h2 class="text 2xl sm:text-4xl mb-4">I am a <span bind:this={typewriterElement}></span></h2>

    
    <!-- <div id="typewriter"></div>

    
    <h1 class="typed">Este texto se mecanografiará</h1>
    <h1 class="typed-text text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up"></h1>
    <h1 class="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
      I'm a <span class="profile-text"></span>
    </h1> -->
    <!-- Add maybe a subtle down arrow hint -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">      
      <img src="{ArrowDown}" alt=" Arrow Down" class="h-10 w-auto"/>
    </div>
  </div>
   <!-- <div />  -->
   <!-- Dummy div to help justify-between -->
</section>

<!-- Basic Animation Styles (Add to app.css or a global style block) -->
<style lang="scss">

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
