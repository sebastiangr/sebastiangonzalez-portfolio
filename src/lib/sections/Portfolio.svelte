<!-- src/lib/components/Portfolio.svelte -->
<script lang="ts">
	import { onDestroy } from 'svelte';
  import IconCode from "$lib/assets/icon-code.svg";

	// Svelte 5: $state for reactive variables
	let hoveredItemId = $state<number | null>(null);
	let currentSlideshowImageIndex = $state(0);
	let slideshowInterval = $state<number | null>(null);

	const portfolioItems = [
    { 
			id: 1,
			client: "La Tina",
      stuff: "Web Development - WordPress",
      link: "https://la-tina.co/",
      designBy: "Veleta Studio Lab",
			description: "Developed a fully responsive multilingual site for an audio post-production studio featuring immersive animations, interactive portfolio viewing, and real-time audio format switching between stereo and Dolby.",
			// status: 'IN PROGRESS',
			defaultImage: "https://placehold.co/600x400/red/FFFe", 
			slideshowImages: [
				'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},
    {
			id: 2,
			client: "World Build Hackathon",
      stuff: "Web Development - Static Site",
      status: "Event Completed",
      designBy: "Veleta Studio Lab",
			description: "Crafted a website showcasing World.org web3 hackathon program, featuring smooth transitions and responsive design to connect innovative entrepreneurs with venture capital opportunities.",
			// status: 'IN PROGRESS',
			defaultImage: "https://placehold.co/600x400/red/FFFe",
			slideshowImages: [
				'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},
		{
			id: 3,
			client: "Péptidos Colombia",
      stuff: "Web Design - Web Development - WordPress - ECommerce",
      link: "https://peptidos.co/",
			description: "Designed and built a e-commerce platform for medical peptides, sarms and nootropics, featuring multiple payment gateways (including cryptocurrency), complete with customized WooCommerce integration.",
			// status: 'IN PROGRESS',
			defaultImage: 'https://placehold.co/600x400/red/FFFe', // Placeholder
			slideshowImages: [
				'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},
		{
			id: 4,
			client: "Lunalunares Studio",
      stuff: "Web Development - WordPress",
      link: "https://lunalunares.com/",
			description: "Developed a visually stunning website for a design studio featuring interactive elements, portfolio project galleries, and a uniquely crafted digital experience that mirrors the studio's creative vision.",
			designBy: "Veleta Studio Lab",
			defaultImage: 'https://placehold.co/600x400/orange/white', // Placeholder
			slideshowImages: [
        'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},
		{
			id: 5,
			client: "Grupo Ajusco",
      stuff: "Web Design - Web Development - WordPress",
      link: "https://grupoajusco.com/",
			description: "Designed and build a website for an Ecuadorian business conglomerate, integrating four distinct company presences through customized template variations, within a single cohesive, modern corporate site.",
			defaultImage: 'https://placehold.co/600x400/orange/white', // Placeholder
			slideshowImages: [
        'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},
		{
			id: 6,
			client: "Unidentified Objects Film",
      stuff: "Web Design - Web Development - WordPress",
      link: "https://unidentifiedobjectsfilm.com/",
			description: "Created a promotional website for the 2022 indie film featuring atmospheric short clip backgrounds and carefully curated film stills that immerse visitors in the movie's unique visual universe.",
			defaultImage: 'https://placehold.co/600x400/orange/white', // Placeholder
			slideshowImages: [
        'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},      
    {
			id: 7,
			client: "Gómez Pineda Abogados",
      stuff: "Web Design - Web Development - WordPress",
      link: "https://gomezpineda.com/",
			description: "Designed and developed an elegant corporate website for a prestigious Colombian law firm, featuring service information and a distinctive virtual art gallery that elevates the traditional legal web presence.",
			defaultImage: 'https://placehold.co/600x400/orange/white', // Placeholder
			slideshowImages: [
        'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},   
    {
			id: 8,
			client: "CorpoLEA",
      stuff: "Web Development - WordPress",
      link: "https://www.corpolea.org/",
			description: "Developed a vibrant website for a non-profit organization that effectively communicates their social transformation mission through visual storytelling of their processes, service lines, and an interactive portfolio.",
      designBy: "Veleta Studio Lab",
			defaultImage: 'https://placehold.co/600x400/orange/white', // Placeholder
			slideshowImages: [
        'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},      
    {
			id: 9,
			client: "BeBrave Paragliding",
      stuff: "Web Design - Web Development - WordPress - Online Booking",
      link: "https://bebraveparagliding.com/",
			description: "Created a website for a Medellín-based paragliding company showcasing stunning flight locations, implementing a streamlined reservation and payment system that converts visitors into adventure-seekers.",
			defaultImage: 'https://placehold.co/600x400/orange/white', // Placeholder
			slideshowImages: [
        'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},  
		{
			id: 10,
			client: "Cineclub Sharing App",
      stuff: "Web Development - Svelte 5 - PostgreSQL",
			description: "CineClubApp is a Svelte-based web application designed to provide users with a platform to explore and manage their proposal movies for a comunity cinema club. The application features user authentication, movie browsing, and messaging functionalities.",
			status: "Under Development",    
      openSource: "https://github.com/sebastiangr/casavieja-cineclub-app",
			defaultImage: 'https://placehold.co/600x400/000000/FFF', // Placeholder
			slideshowImages: [
        'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		}
	];

	function handleMouseEnter(itemId: number) {
		hoveredItemId = itemId;
		currentSlideshowImageIndex = 0; // Reset slideshow for the new item

		if (slideshowInterval) {
			clearInterval(slideshowInterval);
		}

		const currentItem = portfolioItems.find(item => item.id === itemId);
		if (currentItem && currentItem.slideshowImages.length > 0) {
			slideshowInterval = setInterval(() => {
				currentSlideshowImageIndex = (currentSlideshowImageIndex + 1) % currentItem.slideshowImages.length;
			}, 1000); // Change image every 1.5 seconds
		}
	}

	function handleMouseLeave() {
		hoveredItemId = null;
		if (slideshowInterval) {
			clearInterval(slideshowInterval);
			slideshowInterval = null;
		}
		currentSlideshowImageIndex = 0; // Reset for next hover
	}

	// Svelte 5: $effect for cleanup (alternative to onDestroy for effects tied to reactive state)
	// Or just use onDestroy if the interval is managed more directly
	onDestroy(() => {
		if (slideshowInterval) {
			clearInterval(slideshowInterval);
		}
	});

	// Helper to get the current image for the hovered item
	function getCurrentImageUrl(item: (typeof portfolioItems)[0]): string {
		if (item.id === hoveredItemId && item.slideshowImages.length > 0) {
			return item.slideshowImages[currentSlideshowImageIndex];
		}
		return item.defaultImage;
	}
</script>

<div class="portfolio-container my-10">
	{#each portfolioItems as item (item.id)}
		<div
			class="portfolio-item flex flex-col lg:flex-row items-center border-t-2 last:border-b-2 transition-all duration-500 ease-in-out"      
			class:expanded={hoveredItemId === item.id}
      onmouseenter={() => window.innerWidth > 1024 && handleMouseEnter(item.id)}
      onmouseleave={window.innerWidth > 1024 ? handleMouseLeave : undefined}
      role="article"
		>
    <!-- m-16 rounded-lg border-red border-2" -->
    <!-- onmouseenter={() => handleMouseEnter(item.id)}
    onmouseleave={handleMouseLeave} -->
			<!-- <div class="item-content grid md:grid-cols-2 gap-8 items-center"> -->

        <!-- Portfolio Item - Info block -->
				<div class="lg:flex-1 info text-white p-8 lg:p-10">
					<h3 class="portfolio-title">{item.client}</h3>
					<span class="portfolio-stuff">{item.stuff}</span>
					<p class="portfolio-description text-gray-300 mb-6 text-base md:text-lg">{item.description}</p>
					<div class="meta flex justify-between items-center text-sm">
						{#if item.link}
							<a href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								class="button-portfolio" >
								Visit Site
							</a>              
						{/if}
            {#if item.status}
              <span class="status-text">
                {item.status}
              </span>
            {/if}
            {#if item.designBy}
              <span class="design-credit">Design:
                <a href="https://www.instagram.com/veletagram/" target="_blank" rel="noopener noreferrer"> {item.designBy}</a>
              </span>
            {/if}
            {#if item.openSource}
              <span class="opensource-link">
                <!-- <img src={IconCode} alt="See project in Github" class="" /> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-icon lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                <a href={item.openSource} target="_blank" rel="noopener noreferrer">
                  Open source
                </a>
              </span>
            {/if}
            <!-- <span class="design-credit text-gray-500">Design: {item.designBy}</span> -->
					</div>
				</div>

        <!-- Portfolio Item - Info block -->
				<div class="lg:flex-1 w-full lg:w-auto image-preview relative aspect-video md:aspect-[16/10] overflow-hidden">
					<div
						class="image-overlay hidden lg:block lg:absolute inset-0 z-10 transition-opacity duration-300"
						class:opacity-0={hoveredItemId === item.id}
					></div>
					<img
						src={getCurrentImageUrl(item)}
						alt="Preview for {item.client}"
						class="image-element lg:absolute inset-0 w-full h-full object-cover transition-all duration-300"
						class:grayscale={hoveredItemId !== item.id}
            			class:colored={hoveredItemId === item.id}
					/>
				</div>

			<!-- </div> -->

		</div>
	{/each}
</div>

<style lang="postcss">

  .portfolio-item {
    font-family: var(--main-font);
		max-height: 360px;
		overflow: hidden;
    border-color: var(--color-medium);
	}
  .portfolio-item.expanded  {
    max-height: 600px; 
  }
  h3.portfolio-title {
    font-size: 2rem;
    font-style: italic;
    font-weight: 600;
    color: var(--color-red);
  }
  span.portfolio-stuff {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-light);
    margin-bottom: 1.2rem;
  }
  p.portfolio-description {
    font-size: 1rem;
    color: var(--color-white);
    margin-bottom: 1.5rem;
  }

  a.button-portfolio {
    display: inline-block;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-red);
    border: 1px solid var(--color-red);
    text-transform: uppercase;
    transition: all 400ms ease;
    border-radius: 2px;

    &:hover {
      background-color: var(--color-red);
      color: var(--color-black);
      transition: all 400ms ease;
    }
  }
  
  span.status-text {
    display: inline-block;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-medium);
    border: 1px solid var(--color-medium);
    text-transform: uppercase;
    transition: all 400ms ease;
    border-radius: 2px;
  }

  .opensource-link {
    display: flex;
    flex-flow: row;
    align-items: center;

    svg {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 0.5rem;  
    }
  }

  span.opensource-link {
    font-size: 0.8rem;
    color: var(--color-light);

    a {
      color: var(--color-light);
      font-style: italic;
      transition: all 400ms ease;

      &:hover {
        color: var(--color-lightred);
        transition: all 400ms ease;
      }
    }
  }

  span.design-credit {
    font-size: 0.8rem;
    color: var(--color-light);

    a {
      color: var(--color-light);
      font-style: italic;
      transition: all 400ms ease;

      &:hover {
        color: var(--color-lightred);
        transition: all 400ms ease;
      }
    }
  }

	.image-overlay {
		/* background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%); */
    background: linear-gradient(to right, rgb(18, 18, 18) 0%, rgba(18, 18, 18, 0.8) 40%, rgba(18, 18, 18, 0) 100%);
	}

	.image-element.grayscale {
		filter: grayscale(100%);
		transform: scale(1.0); /* Default scale */
	}
	.image-element.colored {
		filter: grayscale(0%);
		transform: scale(1.05); /* Slight zoom on hover */
	}

	/* Consider Tailwind's responsive prefixes if needed e.g. md:max-height-auto */
  @media (max-width: 1024px) { /* md breakpoint */
    .portfolio-item {
      max-height: none; /* Allow content to define height on mobile */
    }
    .portfolio-item .description {
      max-height: none; /* Show full description on mobile */
    }
    .portfolio-item .expanded {
      max-height: none; /* Show full description on mobile */
    }    
  }

</style>



<!-- <script>
	import SectionTitle from "$lib/components/SectionTitle.svelte";

</script>

<section id="" class="w-full flex flex-col items-center justify-center py-16 px-6 sm:px-10 text-white">

  <SectionTitle number="02" title="Portfolio" align="start" speedNumber={1.05} speedTitle={0.95}/>


  <div class="w-full max-w-6xl overflow-x-auto pb-8">
      <div class="flex space-x-8 px-4">
          {#each Array(5) as _, i}
          <div class="flex-shrink-0 w-72 sm:w-80 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                  src="https://via.placeholder.com/400x250/eeeeee/777777?text=Project+{i + 1}+Image"
                  alt="Project {i + 1}"
                  class="w-full h-48 object-cover"
              />
               <div class="p-6">
                   <h3 class="text-xl font-semibold mb-2">Project Title {i + 1}</h3>
                   <p class="text-gray-600 text-sm">
                       A brief description of the project, technologies used, or its main features. Keep it concise.
                   </p>
               </div>
          </div>
          {/each}
      </div>
  </div>
  <p class="text-center text-gray-500 mt-4 text-sm italic px-4">Scroll horizontally to see more projects →</p>
</section> -->


<!-- <script lang="ts">
  import { onMount } from 'svelte';
  
  // Sample portfolio items - replace with your actual projects
  const portfolioItems = [
    {
      title: "Project 1",
      description: "A brief description of project 1 and the technologies used.",
      image: "https://via.placeholder.com/600x400",
      link: "#"
    },
    {
      title: "Project 2",
      description: "A brief description of project 2 and the technologies used.",
      image: "https://via.placeholder.com/600x400",
      link: "#"
    },
    {
      title: "Project 3",
      description: "A brief description of project 3 and the technologies used.",
      image: "https://via.placeholder.com/600x400",
      link: "#"
    },
    {
      title: "Project 4",
      description: "A brief description of project 4 and the technologies used.",
      image: "https://via.placeholder.com/600x400",
      link: "#"
    }
  ];
  
  let carouselContainer: HTMLElement;
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;
  
  onMount(() => {
    if (!carouselContainer) return;
    
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - carouselContainer.offsetLeft;
      scrollLeft = carouselContainer.scrollLeft;
      carouselContainer.style.cursor = 'grabbing';
    };
    
    const handleMouseUp = () => {
      isDragging = false;
      carouselContainer.style.cursor = 'grab';
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carouselContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      carouselContainer.scrollLeft = scrollLeft - walk;
    };
    
    carouselContainer.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    carouselContainer.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      carouselContainer.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      carouselContainer.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

<div class="portfolio-container">
  <h2 class="section-title">Portfolio</h2>
  
  <div class="carousel-container" bind:this={carouselContainer}>
    {#each portfolioItems as item}
      <div class="carousel-item">
        <div class="project-card">
          <div class="project-image">
            <img src={item.image} alt={item.title} />
          </div>
          <div class="project-info">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.link} class="project-link" target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="carousel-controls">
    <div class="scroll-hint">← Drag to explore →</div>
  </div>
</div>

<style>
  .portfolio-container {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .section-title {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 3rem;
    letter-spacing: 0.2rem;
  }
  
  .carousel-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 2rem;
    padding: 1rem 0;
    cursor: grab;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  .carousel-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
  
  .carousel-item {
    flex: 0 0 auto;
    width: 80%;
    scroll-snap-align: center;
    
    @media (min-width: 768px) {
      width: 60%;
    }
    
    @media (min-width: 1024px) {
      width: 40%;
    }
  }
  
  .project-card {
    background-color: rgba(45, 45, 45, 0.5);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }
  
  .project-card:hover {
    transform: translateY(-10px);
  }
  
  .project-image img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .project-card:hover .project-image img {
    transform: scale(1.05);
  }
  
  .project-info {
    padding: 1.5rem;
  }
  
  .project-info h3 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  
  .project-info p {
    margin-bottom: 1rem;
    opacity: 0.8;
  }
  
  .project-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: 1px solid white;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .project-link:hover {
    background-color: white;
    color: black;
  }
  
  .carousel-controls {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .scroll-hint {
    opacity: 0.7;
    font-size: 0.9rem;
    animation: fadeInOut 2s infinite;
  }
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.9; }
  }
</style> -->