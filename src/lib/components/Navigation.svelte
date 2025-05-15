<script lang="ts">
  import ArrowUp from "$lib/assets/arrow-up.svg";
  import ArrowDown from "$lib/assets/arrow-down.svg";
  import { anchors, currentIndex } from "$lib/stores/navigationStore";
  import { get } from "svelte/store";

  // TODO: Implementar que ambas arrow se escondan en el home, y que la arrowDown se esconda en contact

  // Derivar el índice actual como valor (no como función)
  // let index = $derived(() => get(currentIndex));
  // let list = $derived(() => get(anchors));

  // // Controlar visibilidad de flechas
  // let isHome = $derived(() => index() === 0);
  // let isLast = $derived(() => index() === list.length - 1);

  // // Navegación por anclas  
  // function scrollTo(index: number) {
  //   const anchorList = get(anchors);
  //   const target = document.querySelector(anchorList[index]);
  //   if (target) {
  //     target.scrollIntoView({ behavior: "smooth" });
  //     currentIndex.set(index);
  //   }
  // }
  
  // $effect(() => {
  //   console.log("Navigation mounted");

  //   return () => {
  //     console.log("Navigation unmounted");
  //   };
  // });

</script>

<div class="nav-container fixed flex flex-col z-40 bottom-0 right-0 p-4" >
  <!-- class:hidden={isHome} > -->
  <!-- Up Arrow -->
  
    <!-- <button type="button"
      onclick={() => scrollTo(index() - 1)} > -->
    <button type="button" >
      <!-- class:hidden={currentIndex === 0} > -->
      <img src={ArrowUp} alt="Go to previous section" class="cursor-pointer" />
    </button>
  

    <!-- Flecha hacia abajo -->
  
    <button type="button" >
    <!-- <button type="button" 
      onclick={() => scrollTo(index() + 1)}>       -->
      <img src={ArrowDown} alt="Go to next section" class="cursor-pointer" />
    </button>
  

  <!-- Down Arrow -->
  <!-- <button type="button"
    onclick={() => scrollToAnchor(index() + 1)} 
    class:hidden={isContactValue} > -->
    <!-- class:hidden={currentIndex === anchors.length - 1} > -->
    <!-- <img src={ArrowDown} alt="Go to next section" class="cursor-pointer" />
  </button> -->
</div>


<style>
  .nav-container {
    /* position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center; */
  }

  .nav-container img {
    width: 40px;
    height: 40px;
    margin: 5px;
  }
</style>