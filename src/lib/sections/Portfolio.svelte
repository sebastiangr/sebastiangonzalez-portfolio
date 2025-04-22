<script lang="ts">
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
</style>