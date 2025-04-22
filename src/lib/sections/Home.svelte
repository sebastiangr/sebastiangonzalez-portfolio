<script lang="ts">
  import Logo from "$lib/assets/sebastiangonzalez.co-logo.svg";
  
  export let toggleMenu: () => void;
</script>

<div class="home-container">
  <div class="content">
    <h1 class="title">Sebastián González</h1>
    <p class="subtitle">Web & App Developer</p>
    <div class="scroll-indicator">
      <span>Scroll Down</span>
      <div class="arrow">↓</div>
    </div>
  </div>
</div>

<style>
  .home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background: linear-gradient(to bottom, #2d2d2d 0%, rgb(19, 19, 19) 100%);
    position: relative;
    overflow: hidden;
  }
  
  .content {
    text-align: center;
    z-index: 1;
  }
  
  .title {
    font-size: 3rem;
    margin-bottom: 1rem;
    letter-spacing: 0.3rem;
    
    @media (min-width: 768px) {
      font-size: 5rem;
    }
  }
  
  .subtitle {
    font-size: 1.5rem;
    opacity: 0.8;
    margin-bottom: 2rem;
    
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.7;
    animation: pulse 2s infinite;
  }
  
  .arrow {
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.7;
      transform: translateX(-50%) translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) translateY(10px);
    }
    100% {
      opacity: 0.7;
      transform: translateX(-50%) translateY(0);
    }
  }
</style>