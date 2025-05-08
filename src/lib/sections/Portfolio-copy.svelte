<!-- src/lib/components/Portfolio.svelte -->
<script lang="ts">
	import { onDestroy } from 'svelte';

	// Svelte 5: $state for reactive variables
	let hoveredItemId = $state<number | null>(null);
	let currentSlideshowImageIndex = $state(0);
	let slideshowInterval = $state<number | null>(null);

	const portfolioItems = [
		{
			id: 1,
			client: 'Péptidos Colombia',
			description: 'An innovative eCommerce platform for specialized health supplements. Focused on user experience and secure transactions.',
			status: 'IN PROGRESS',
			designBy: '@VeletaStudioLab',
			defaultImage: 'https://placehold.co/600x400/red/FFFe', // Placeholder
			slideshowImages: [
				'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},
		{
			id: 2,
			client: 'Lunares Studio',
			description: 'Portfolio website for a creative design agency, showcasing their unique projects and artistic vision.',
			link: '#', // Replace with actual link
			designBy: '@VeletaStudioLab',
			defaultImage: 'https://placehold.co/600x400/orange/white', // Placeholder
			slideshowImages: [
        'https://placehold.co/600x400',
				'https://placehold.co/600x400/orange/white',
				'https://placehold.co/600x400/000000/FFF',
				'https://placehold.co/600x400/red/FFF',
			]
		},
		{
			id: 3,
			client: 'Audio Post Pro',
			description: 'Corporate site for an audio post-production house, highlighting services and client testimonials like Netflix, HBO etc.',
			status: 'LAUNCHED',
			designBy: 'Client Internal',
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
      class="portfolio-item-wrapper border-t border-red-700 last:border-b  transition-all duration-500 ease-in-out"
      class:expanded={hoveredItemId === item.id}
      onmouseenter={() => handleMouseEnter(item.id)}
      onmouseleave={handleMouseLeave}
      role="article"
    >
			<div class="portfolio-item-content grid md:grid-cols-2 items-center">
				<div class="info-container flex flex-col justify-center text-white pl-4 md:pl-8 pr-4 md:pr-8 h-full">
          <div>
            <p class="text-red-400 text-sm mb-1">Client: {item.client}</p>
            <h3 class="text-2xl md:text-3xl font-semibold mb-3">{item.client}</h3>
            <p class="description text-gray-300 mb-6 text-base md:text-lg">{item.description}</p>
            <div class="meta flex justify-between items-center text-sm">
              {#if item.status}
                <span
                  class="status-button border border-red-500 text-red-400 px-4 py-2 rounded-sm text-xs uppercase tracking-wider"
                >
                  {item.status}
                </span>
              {/if}
              {#if item.link}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="status-button border border-red-500 text-red-400 hover:bg-red-500 hover:text-black px-4 py-2 rounded-sm text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  Visit Site
                </a>
              {/if}
              <span class="design-credit text-gray-500">Design: {item.designBy}</span>
            </div>
          </div>
				</div>

				<div class="image-preview relative aspect-video md:aspect-[16/10] overflow-hidden">
					<div
						class="image-overlay absolute inset-0 z-10 transition-opacity duration-300"
						class:opacity-0={hoveredItemId === item.id}
					></div>
					<img
						src={getCurrentImageUrl(item)}
						alt="Preview for {item.client}"
						class="image-element absolute inset-0 w-full h-full object-cover transition-all duration-300"
						class:grayscale={hoveredItemId !== item.id}
            			class:colored={hoveredItemId === item.id}
					/>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.portfolio-item-wrapper {
		/* This wrapper will control the overall item appearance */
		/* No explicit height here; it will be determined by its content. */
    max-height: 300px; /* Approximate for content visibility, will be overridden */
		overflow: hidden; /* Crucial for the height transition */
    transition: max-height 1s ease-in-out;
	}
	.description {
		/* Initial collapsed state for the description */
		max-height: 4.5em; /* Approx 3 lines for non-expanded state */
		overflow: hidden;
		/* transition for max-height is already on the class */
	}
  .portfolio-item-wrapper.expanded .description {
		max-height: 30em; /* Allow full description to show; adjust if needed */
    
	}
  /* The .info-container will manage the vertical centering of its content */
	.info-container {
		/* Ensures it takes full available height within its grid cell */
		min-height: 250px; /* Or whatever your non-expanded image height is approx. */
                           /* This helps maintain some initial space if text is very short */
    transition: min-height 0.5s ease-in-out; /* Smooth transition for min-height */
	}
  .portfolio-item-wrapper.expanded .info-container {
        /* When expanded, the info container's height will naturally grow with its content
           and the overall grid item alignment.
           We might want to give it a larger min-height if the image side is very tall,
           but `items-center` on the parent grid should handle most cases.
           If the description is very long, this container will expand.
        */
         min-height: 350px; /* Example: ensure it can grow a bit more explicitly */
         
    }




	.portfolio-item1 {
		max-height: 300px; /* Approximate for content visibility, will be overridden */
		overflow: hidden; /* Crucial for the height transition */
    transition: max-height 1s ease-in-out;
	}

  /* More specific control for initial height of content parts */
  .portfolio-item1 .description1 {
    max-height: 4.5em; /* Approx 3 lines */
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
  }
  .portfolio-item.expanded1 .description1 {
    max-height: 20em; /* Allow full description */
  }


	/* Expanded height - should be enough to show all content. This is a bit tricky.
	   A better approach might be to set a fixed height initially and then 'auto' or a larger fixed height.
	   For simplicity, we double a base height.
	*/
	.portfolio-item.expanded1 {
		max-height: 700px;
    transition: max-height 1s ease-in-out;
    /* Let's rely on inner content + padding for height
     Instead of max-height on the item, we'll let content define it
           and just ensure the description can expand.
           The visual effect of "doubling" might be more about the visual space
           the image takes or the content revealed. The image is fixed aspect ratio.
        */
	}

	.image-overlay {
		background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%);
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
    @media (max-width: 767px) { /* md breakpoint */
        .portfolio-item {
            max-height: none; /* Allow content to define height on mobile */
        }
        .portfolio-item .description {
            max-height: none; /* Show full description on mobile */
        }
        .info {
            order: 2; /* Info below image on mobile */
            margin-top: 1.5rem; /* 24px */
        }
        .image-preview {
            order: 1;
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