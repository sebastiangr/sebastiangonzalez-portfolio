<script lang="ts">
  import { fade } from "svelte/transition";
	import SectionTitle from "$lib/components/SectionTitle.svelte";
	import SectionT from "$lib/components/SectionT.svelte";

  // This section is for displaying skills and technologies.
  // You can customize the skills and their styles as per your preference.
  // Simple form submission handler (replace with actual logic if needed)
  function handleSubmit(event: { preventDefault: () => void; }) {
      event.preventDefault();
      alert('Form submitted (Placeholder)! Integrate with your backend or email service.');
      // Example: Clear form
       // event.target.reset();
  }

  let slides = [
    {
      title: "From Concept to Reality",
      text: "Have just an idea? Let's transform it into a functioning digital solution. My end-to-end process guides your concept through design, development, testing, and deployment—creating exactly what you envisioned but couldn't yet see.",
    },
    {
      title: "Elevate Your Existing Project",
      text: "Stuck with an unfinished project or need to expand functionality? I can step in at any development stage, analyze what's working, improve what's not, and help carry your vision forward with clean, maintainable code.",
    },
    {
      title: "Fix AI-Generated Nightmares",
      text: "Tried using AI to generate your project code but ended up with bugs and inconsistencies? I can help you in refining, fixing, and properly implementing AI-generated code into production-ready applications that actually work.",
    },
    {
      title: "Technical Partner, Not Just a Developer",
      text: "Looking for someone who understands both business goals and technical requirements? I collaborate closely to refine ideas, structure logic, craft interfaces, and deliver solutions that serve your specific needs—not just writing code, but building your digital future.",
    },
  ];

  let activeSlide = 0;
  let interval: number | undefined;

  // Autoplay functionality
  function startAutoplay() {
    interval = setInterval(() => {
      activeSlide = (activeSlide + 1) % slides.length;
    }, 5000); // Change slide every 5 seconds
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  // Start autoplay on mount
  startAutoplay();
</script>

<!-- <section id="" class="min-h-screen w-full flex flex-col items-center justify-center py-16 px-6 sm:px-10 text-white"> -->
  <!-- TODO: Typewriter effect -->
  <!-- <h2 class="text-4xl sm:text-6xl font-bold mb-10 sm:mb-16 text-center text-teal-400">Let's Talk</h2> -->
  <!-- <SectionTitle number="04" title="Let's Talk" align="centered" speedNumber={0.9} speedTitle={1.1}/> -->

<div class="w-full lg:w-3/4 mx-auto flex flex-col lg:flex-col items-center justify-center py-16 px-6 sm:px-10 text-white">  

<!-- 
  <div class="w-full lg:w-3/4 mx-auto">
    <div class="contact-text">
      <h2 class="text-center">From Concept to Reality</h2>
      <p class="main-text text-center mb-10 lg:mb-20">
        Have just an idea? Let's transform it into a functioning digital solution. My end-to-end process guides your concept through design, development, testing, and deployment—creating exactly what you envisioned but couldn't yet see.
      </p>
    </div>
    <div class="contact-text">
      <h2 class="text-center">Elevate Your Existing Project</h2>
      <p class="main-text text-center mb-10 lg:mb-20">
        Stuck with an unfinished project or need to expand functionality? I can step in at any development stage, analyze what's working, improve what's not, and help carry your vision forward with clean, maintainable code.
      </p>
    </div>
    <div class="contact-text">
      <h2 class="text-center">Fix AI-Generated Nightmares</h2>
      <p class="main-text text-center mb-10 lg:mb-20">
        Tried using AI to generate your project code but ended up with bugs and inconsistencies? I can help you in refining, fixing, and properly implementing AI-generated code into production-ready applications that actually work.
      </p>
    </div>
    <div class="contact-text">
      <h2 class="text-center">Technical Partner, Not Just a Developer</h2>
      <p class="main-text text-center mb-10 lg:mb-20">
        Looking for someone who understands both business goals and technical requirements? I collaborate closely to refine ideas, structure logic, craft interfaces, and deliver solutions that serve your specific needs—not just writing code, but building your digital future.
      </p>
    </div>  
  </div> -->

  <div class="w-full mb-10 item">
    <SectionT number="04" title="Contact" align="centered" speedNumber={0.95} speedTitle={0.9} />
  </div> 

  <!-- <div
    class="slider-container flex-1 px-6 lg:px-20"
    on:mouseenter={stopAutoplay}
    on:mouseleave={startAutoplay}
    role="region"
    aria-label="Slideshow"
  >
    {#each slides as slide, index}
      <div
        class="slide"
        in:fade={{ duration: 500 }}
        out:fade={{ duration: 500 }}
        style="display: {index === activeSlide ? 'block' : 'none'}"
      >
        <h2 class="text-center">{slide.title}</h2>
        <p class="main-text text-center mb-4 lg:mb-10">{slide.text}</p>
      </div>
    {/each}

    <div class="dots mb-20">
      {#each slides as _, index}
        <button
          class="dot {index === activeSlide ? 'active' : ''}"
          on:click={() => (activeSlide = index)}
          aria-label="Go to slide {index + 1}"
        ></button>
      {/each}
    </div>
  </div> -->


  <!-- Contact Form -->
  <form on:submit={handleSubmit} class="flex-1 w-full max-w-lg mb-16 space-y-6">
    <div>
      <label for="email" class="block text-sm font-medium mb-1">Your Email</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="user@domain"
        class="input-field"
      />
    </div>
    <div>
      <label for="message" class="block text-sm font-medium mb-1">Message</label>
      <textarea
        id="message"
        name="message"
        rows="5"
        required
        placeholder="Write your message here..."
        class="input-field"
      ></textarea>
    </div>
    <button
      type="submit"
      class="submit-button"
    >
      Send Message
    </button>
  </form>

  <!-- Social Links -->
  <!-- <div class="text-center">
      <p class="mb-6 text-lg text-gray-400">Connect with me:</p>
      <div class="flex justify-center space-x-6">
           <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="GitHub">
               {@html icons.github}
           </a>
           <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="LinkedIn">
               {@html icons.linkedin}
           </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="WhatsApp">
                {@html icons.whatsapp}
            </a>
             <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="Telegram">
                {@html icons.telegram}
            </a>
           <a href="mailto:your.email@example.com" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="Email">
                {@html icons.mail}
           </a>
      </div>
  </div> -->
</div>

<!-- Version 1:
Message 1: From Concept to Reality
Have just an idea? Let's transform it into a functioning digital solution. My end-to-end process guides your concept through design, development, testing, and deployment—creating exactly what you envisioned but couldn't yet see.
Message 2: Elevate Your Existing Project
Stuck with an unfinished project or need to expand functionality? I can step in at any development stage, analyze what's working, improve what's not, and help carry your vision forward with clean, maintainable code.
Message 3: Fix AI-Generated Nightmares
Tried using AI to generate your project code but ended up with bugs and inconsistencies? I specialize in refining, fixing, and properly implementing AI-generated code into production-ready applications that actually work.
Message 4: Technical Partner, Not Just a Developer
Looking for someone who understands both business goals and technical requirements? I collaborate closely to refine ideas, structure logic, craft interfaces, and deliver solutions that serve your specific needs—not just writing code, but building your digital future.
 -->



<!-- </section> -->

<style lang="postcss">

  .slider-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  .slide {
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100%;
    opacity: 0.8;
    transition: opacity 0.5s ease-in-out;
  }

  .slide:nth-child(1) {
    opacity: 1;
  }

  .dots {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .dot {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: var(--color-light);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .dot.active {
    background-color: var(--color-red);
  }

  .dot:hover {
    background-color: var(--color-red);
  }



  h2 {
    color: var(--color-red);
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .input-field {
    font-family: var(--main-font);
    border: 2px solid var(--color-light);
    border-radius: 4px;
    background-color: var(--color-black);
    color: var(--color-white);
    padding: 0.5rem;
    width: 100%;
  }

  label {
    font-family: var(--main-font);
    color: var(--color-red);
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .submit-button {
    font-family: var(--main-font);
    border: 2px solid var(--color-red);
    border-radius: 4px;
    background-color: var(--color-black);
    color: var(--color-red);
    padding: 0.5rem 1rem;
    transition: all 400ms ease;
    width: 100%;
  }

  .submit-button:hover {
    background-color: var(--color-red);
    border: 2px solid var(--color-red);
    color: var(--color-black);
    transition: all 400ms ease;
  }
</style>