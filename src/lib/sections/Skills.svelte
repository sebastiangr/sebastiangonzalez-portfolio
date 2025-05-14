<script>
  import SectionT from "$lib/components/SectionT.svelte";
  import { onMount } from 'svelte';
  
  let tab = 'development';

  onMount(() => {
    const marquee = document.querySelector('.js-marquee');
    const inner = marquee.querySelector('.marquee-inner');

    // Clone the content to create a seamless loop
    const clone = inner.cloneNode(true);
    marquee.appendChild(clone);
  });

</script>


<div class="w-full flex flex-col pt-6 pb-20 px-10 lg:px-16 xl:px-20 text-white">

  <div class="flex justify-start mb-20 mt-10">
    <div class="w-full lg:w-3/4">
      <p class="main-text text-left">
        I love <span>art, computers and tech.</span><br>
        Each skill I've developed allows me to turn ideas into reality through code, design, and technical problem-solving. 
      </p>
    </div>
  </div>

  <div class="flex flex-col lg:flex-row items-stretch justify-center w-full mt-6">
    <div class="skills-wrapper w-full lg:w-1/3 px-4 lg:px-6 mb-6 lg:mb-0">
      <h3 class="skills-title">#Development</h3>
      <ul class="skills-list">
        <li><span>*</span> Modern Frontend with Svelte & SvelteKit.</li>
        <li><span>*</span> Mobile experiences through Flutter & Dart.</li>
        <li><span>*</span> Custom WordPress themes & plugins.</li>
        <li><span>*</span> Responsive HTML5 & CSS3 mastery.</li>
        <li><span>*</span> JavaScript & TypeScript implementation.</li>
        <li><span>*</span> API integration & development.</li>
      </ul>
    </div>
    <div class="skills-wrapper w-full lg:w-1/3 px-4 lg:px-6 mb-6 lg:mb-0">
      <h3 class="skills-title">#Design</h3>
      <ul class="skills-list">
        <li><span>*</span> Interface design with focus on usability.</li>
        <li><span>*</span> Digital illustration & graphics creation.</li>
        <li><span>*</span> UI/UX principles & implementation.</li>
        <li><span>*</span> Wireframing & prototyping.</li>
        <li><span>*</span> Adobe Creative Suite expertise.</li>
        <li><span>*</span> Figma & Penpot design workflows.</li>
      </ul>
    </div>
    <div class="skills-wrapper w-full lg:w-1/3 px-4 lg:px-6 mb-6 lg:mb-0">
      <h3 class="skills-title">#Dev Ops</h3>
      <ul class="skills-list">
        <li><span>*</span> Full deployment pipelines.</li>
        <li><span>*</span> Database architecture (SQL & NoSQL).</li>
        <li><span>*</span> Version control & collaboration.</li>
        <li><span>*</span> Performance optimization.</li>
        <li><span>*</span> Cross-browser & platform testing.</li>
        <li><span>*</span> Security implementation.</li>
      </ul>
    </div>
  </div>
<!-- 
  <div class="flex flex-col items-center w-full mt-6">

    <div class="tabs-wrapper w-full flex justify-center">
      <button class="tab-button" class:active={tab === 'development'} 
      on:click={() => tab = 'development'}>Development</button>
      <button class="tab-button" class:active={tab === 'design'} on:click={() => tab = 'design'}>Design</button>
      <button class="tab-button" class:active={tab === 'devops'} on:click={() => tab = 'devops'}>Dev Ops</button>      
    </div>

    <div class="tab-content w-full mt-6 flex items-center justify-center"  transition:fade={{ duration: 500 }}>
      {#if tab === 'development'}
        <ul class="skills-list">
          <li><span>*</span> Modern Frontend with Svelte & SvelteKit.</li>
          <li><span>*</span> Mobile experiences through Flutter & Dart.</li>
          <li><span>*</span> Custom WordPress themes & plugins.</li>
          <li><span>*</span> Responsive HTML5 & CSS3 mastery.</li>
          <li><span>*</span> JavaScript & TypeScript implementation.</li>
          <li><span>*</span> API integration & development.</li>
        </ul>
      {:else if tab === 'design'}
        <ul class="skills-list">
          <li><span>*</span> Interface design with focus on usability.</li>
          <li><span>*</span> Digital illustration & graphics creation.</li>
          <li><span>*</span> UI/UX principles & implementation.</li>
          <li><span>*</span> Wireframing & prototyping.</li>
          <li><span>*</span> Adobe Creative Suite expertise.</li>
          <li><span>*</span> Figma & Penpot design workflows.</li>
        </ul>
      {:else if tab === 'devops'}
        <ul class="skills-list">
          <li><span>*</span> Full deployment pipelines.</li>
          <li><span>*</span> Database architecture (SQL & NoSQL).</li>
          <li><span>*</span> Version control & collaboration.</li>
          <li><span>*</span> Performance optimization.</li>
          <li><span>*</span> Cross-browser & platform testing.</li>
          <li><span>*</span> Security implementation.</li>
        </ul>
      {/if}
    </div>
  </div>   -->

</div>

<div class="marquee running js-marquee mb-20 md:mb-32">
  <div class="marquee-inner">
    <span>Svelte / WordPress / Node / JavaScript / Flutter / PostgreSQL / Docker / HTML5 / CSS3 / </span>
  </div>
</div>

<style lang="postcss">

/* .marquee {
  background: var(--color-red);
  color: var(--color-white);
  font-family: var(--main-font);
  font-size: 5rem;
  font-style: italic;
  transition: all 0.5s;
  text-transform: uppercase;
  overflow: hidden;
  &.running .marquee-inner{
    animation-play-state: running
  }
  &:hover .marquee-inner {
    animation-play-state: running
  }
  span {
    padding: 0 0.15em;
    white-space: nowrap;
  }
}
:root{
  --offset: 0px;
  --move-initial: calc(-25% + var(--offset));
  --move-final: calc(-50% + var(--offset));
} */

  :root {
    --move-initial: 0%; /* Start position */
    --move-final: -100%; /* End position */
  }

  p.main-text {
    span {
      background-color: var(--color-red);
      color: var(--color-white);
      font-style: italic;
    }
  }

  .skills-wrapper {
  }

  h3.skills-title {
    color: var(--color-red);
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  ul.skills-list {
    font-family: var(--main-font);
    list-style: none;
    padding: 0;
    margin: 0;
        
    li {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      span {
        color: var(--color-red);
        margin-right: 0.1rem;
      }

      @media screen and (max-width: 80rem) {
        font-size: 0.9rem;        
      }
      @media screen and (max-width: 64rem) {
        font-size: 0.85rem;        
      }
    }
  }  

  .marquee {
    background: var(--color-red);
    font-family: var(--main-font);
    /* font-family: var(--geometria-font); */
    font-weight: 700;
    font-size: 8rem;
    text-transform: uppercase;
    overflow: hidden;
    position: relative; /* Ensure child elements are positioned relative to this container */
    white-space: nowrap; /* Prevent text wrapping */
    width: 100%; /* Ensure the marquee spans the full width */
    user-select: none;

    @media screen and (max-width: 80rem) {
      font-size: 6rem;        
    }
    @media screen and (max-width: 64rem) {
      font-size: 5rem;        
    }
    @media screen and (max-width: 48rem) {
      font-size: 4rem;        
    }  
  }

  .marquee-inner {
    display: inline-flex; /* Ensure the content spans its full width */
    animation: marquee 40s linear infinite; /* Continuous animation */
  }

  .marquee-inner span {
    color: var(--color-red);
    padding: 0;  
    -webkit-text-stroke: 2px var(--color-white);
    text-stroke: 2px var(--color-white);
    -webkit-text-fill-color: var(--color-red);
    text-fill-color: var(--color-red);
    white-space: nowrap; 
    padding: 0;
    opacity: 0.5;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0); /* Start at the initial position */
    }
    100% {
      transform: translateX(-100%); /* Move completely out of view */
    }
  }



  .tabs-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  button.tab-button {
    /* background-color: #fff; */
    color: var(--color-medium);
    font-family: var(--main-font);
    font-size: 1.5rem;
    font-weight: 700;
    border: 1px solid transparent;
    padding: 1rem 1.2rem;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  button.tab-button:hover {
    border: 1px solid var(--color-medium);
    border-radius: 4px;
  }

  button.tab-button.active {
    /* background-color: #333; */
    /* color: #fff; */
    color: var(--color-red);
    border: 1px solid var(--color-red);
    border-radius: 4px;
  }

  .tab-content {
    padding: 2rem;
    /* background-color: #fff; */
    /* border: 1px solid #ddd; */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  }
</style>
<!-- background-image: linear-gradient(to right, #434343 0%, black 100%); -->
