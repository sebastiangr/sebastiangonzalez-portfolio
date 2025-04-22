<script lang="ts">
	import { isMenuOpen, closeMenu } from '$lib/stores/menuStore';
	import { fade } from 'svelte/transition';

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

{#if $isMenuOpen}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 text-white"
		role="dialog"
		aria-modal="true"
	>
		<!-- Close Button -->
		<button
			on:click={closeMenu}
			class="absolute top-6 right-6 text-white hover:text-gray-300 text-3xl"
			aria-label="Close menu"
		>
			× <!-- Simple 'X' icon -->
		</button>

		<!-- Navigation Links -->
		<nav>
			<ul class="flex flex-col items-center space-y-8">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class="text-3xl sm:text-4xl font-semibold hover:text-teal-400 transition-colors duration-200"
							on:click={handleLinkClick}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
{/if}