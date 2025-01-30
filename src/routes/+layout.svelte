<script>
  import { onMount } from 'svelte';
</script>

<div class="bg-black text-white flex justify-center gap-4 p-4 fixed top-0 left-0 right-0 font-sans">
  <a href="/" class="text-white no-underline">Home</a>
  <a href="/portfolio" class="text-white no-underline">Portfolio</a>
  <a href="/contacto" class="text-white no-underline">Contacto</a>
</div>

<div class="flex items-center justify-center min-h-screen">
  <slot />
</div>

