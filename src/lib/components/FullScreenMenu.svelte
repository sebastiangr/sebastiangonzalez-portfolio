<script lang="ts">
	import { isMenuOpen, closeMenu, toggleMenu } from '$lib/stores/menuStore';
	import { fade, slide } from 'svelte/transition';
  import Logo from "$lib/assets/sebastiangonzalez.co-logo.svg";
  // import Logo from "/images/sebastiangonzalez.co-logo.svg";

	// List of navigation items
	const navItems = [
		{ href: '#home', label: 'Home' },
		{ href: '#about-me', label: 'About Me' },
		{ href: '#portfolio', label: 'Portfolio' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#contact', label: 'Contact' }
	];

	// Close menu when a link is clicked
	function handleLinkClick() {
		closeMenu();
	}
</script>

<!-- MENU OVERLAY -->
{#if $isMenuOpen}
	<div transition:slide={{ duration: 400, axis: 'y', easing: t => t}}
		id="menu-overlay" class="fixed inset-0 z-40 flex flex-col items-center justify-center text-white"
		role="dialog"
		aria-modal="true">		
		<nav>
			<ul class="menu-items flex flex-col items-center space-y-8">
				{#each navItems as item}
					<li>
						<a href={item.href}
							class="text-2xl sm:text-4xl font-semibold transition-colors duration-200"
							onclick={handleLinkClick}>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
{/if}

<!-- LOGO -->
<div class="logo-header fixed top-0 left-0 z-40">
  <!-- <img src={Logo} alt="Sebastian Gonzalez Logo" class="transition duration-1000 ease-in-out hover:rotate-180" /> -->
  <img src={Logo} alt="Sebastian Gonzalez Logo" class="" />
</div>

<!-- MENU HAMBURGER -->
<div class="menu-button-wrapper fixed top-0 right-0 p-4 z-40">
  <div class="menu-hamburger">
    <button class="menu-button" onclick={toggleMenu} aria-label="Open main menu"></button>
    <div class="menu-bars" class:active={$isMenuOpen}>
      <span class="menu-bar top"></span>
      <span class="menu-bar bottom"></span>
    </div>
  </div>
</div>  

<style>

  #menu-overlay {
    background-color: rgba(0, 0, 0, 0.9);
  }

  ul.menu-items {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: "JetBrains Mono", monospace;
    font-variant-ligatures: none;

    li a {
      text-decoration: none;
      color: var(--color-light, #a0a0a0);
      transition: color 0.3s ease-in-out;
    }
    li a:hover {
      color: var(--color-white, #f5f5f5);
      font-style: italic;
    }
    li a:hover:before {
      content: '<';
      margin-right: 8px;
      color: var(--color-lightred, #e7595b);
    }
    li a:hover:after {
      content: '/>';
      margin-right: 8px;
      color: var(--color-lightred, #e7595b);
    }
  }

  .logo-header img {
    margin: 30px;
    width: 100px;
    height: 100px;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out, margin 0.3s ease-in-out, transform 1s ease-in-out;
  }
  .logo-header img:hover {
    transform: rotate(180deg);
    transition: transform 1s ease-in-out;
  }
  @media (max-width: 1024px) {
    .logo-header img {
      margin: 20px;
      width: 80px;
      height: 80px;      
    }
  }

  .menu-hamburger {
    position: relative;
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
  /* TODO: Reducir el tamaño del icono en mobile */

  button.menu-button {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    z-index: 2;
    -webkit-touch-callout: none;
    position: absolute;
    opacity: 0;
  }

  .menu-bars {
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 20px;
  }

  span.menu-bar {
    position: absolute;
    display: block;
    width: 100%;
    height: 3px;    
    background-color: var(--color-white, #f5f5f5);
    /* background-color: var(--bar-bg, #ffffff); */
    border-radius: 2px;
    transition: all 0.2s cubic-bezier(0.1, 0.82, 0.76, 0.965);

    &.top {
      width: 70%;
      top: 0;
    }
    &.bottom {
      width: 70%;
      bottom: 0;
      right: 0;
    }
  }

  .menu-bars.active span.menu-bar.top {
    transform: rotate(45deg);
    top: 9px;
    width: 100%;
  }
  .menu-bars.active span.menu-bar.bottom {
    transform: rotate(-45deg);
    bottom: 8px;
    width: 100%;
  }

  .menu-hamburger:hover span.menu-bar.top,
  .menu-hamburger:hover span.menu-bar.bottom {
    width: 100%;
  }

  .menu-hamburger:hover .menu-bars.active span.menu-bar.top,
  .menu-hamburger:hover .menu-bars.active span.menu-bar.bottom {
    width: 100%;
  }

</style>