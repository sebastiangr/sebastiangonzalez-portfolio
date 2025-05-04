<script>
	import Preloader from "$lib/components/Preloader.svelte";

  // Access data returned from +layout.ts if needed
	export let data;
  // console.log('Layout data:', data);

</script>


<main class="container mx-auto p-4 pt-10"> <!-- Added padding-top -->
  <h1>My SvelteKit App</h1>
  <p>Data from load: {JSON.stringify(data?.loadedData)}</p>
</main>
<!-- <Preloader /> -->