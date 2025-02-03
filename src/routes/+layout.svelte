<script>
  import { onMount } from 'svelte';
  import '../app.css';
</script>

<!-- <div class="bg-black text-white flex justify-center gap-4 p-4 fixed top-0 left-0 right-0 font-sans">
  <a href="/" class="text-white no-underline">Home</a>
  <a href="/portfolio" class="text-white no-underline">Portfolio</a>
  <a href="/contacto" class="text-white no-underline">Contacto</a>
</div> -->

<div class="body-bg flex items-center justify-center min-h-screen">
  <slot />
</div>


<style>
  .body-bg  {
    /* background: linear-gradient(to bottom, #0f0f0f 0%, #2d2d2d 100%), linear-gradient(to top, rgb(15, 15, 15) 0%, rgba(204, 185, 185, 0.25) 100%); */
    background: linear-gradient(to bottom, #2d2d2d 0%, rgb(19, 19, 19) 100%);
    
    background-blend-mode: multiply;  
  }  
</style>