<script lang="ts">
  // This section is for displaying skills and technologies.
  // You can customize the skills and their styles as per your preference.
  // Simple form submission handler (replace with actual logic if needed)
  function handleSubmit(event: { preventDefault: () => void; }) {
      event.preventDefault();
      alert('Form submitted (Placeholder)! Integrate with your backend or email service.');
      // Example: Clear form
       // event.target.reset();
  }

  // Placeholder SVG icons (replace with actual SVGs or an icon library like Feather Icons, FontAwesome)
  const icons = {
      github: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
      linkedin: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.781c-.996 0-1.802-.806-1.802-1.8s.806-1.8 1.802-1.8 1.802.806 1.802 1.8-.806 1.8-1.802 1.8zm13.5 12.781h-3v-5.604c0-1.412-.491-2.187-1.305-2.187-.977 0-1.578.71-1.578 2.187v5.604h-3v-11h3v1.466c.452-.78 1.336-1.466 2.805-1.466 1.941 0 3.078 1.356 3.078 3.84v7.16z"/></svg>`,
      whatsapp: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.169.271-1.04 3.797 3.919-1.035.275.173zm11.35-6.991c-.193-.34-.697-.557-1.154-.627-.566-.087-1.24-.099-1.857.107-.71.243-1.069.698-1.483 1.188-.476.544-.956 1.135-1.307 1.315-.316.162-.625.174-.896.107-.316-.074-.719-.267-1.219-.594-.709-.477-1.309-1.088-1.813-1.821-.547-.797-.906-1.753-.995-2.741.046-.562.305-.999.627-1.294.255-.23.546-.347.853-.347.276 0 .512.019.703.035.261.022.43.038.603.342.227.392.377.859.427 1.026.064.202.034.413-.099.574-.156.187-.427.519-.574.687-.173.187-.328.212-.482.318s-.244.112-.392.062c-.173-.05-.347-.112-.482-.162l-.146-.05c-.672-.244-1.229-.627-1.693-1.069s-.797-1.035-.995-1.483c-.212-.477-.227-.887-.202-1.188.022-.276.074-.482.162-.627.107-.156.244-.276.381-.364.156-.107.293-.156.43-.173.173-.022.347-.022.52-.022h.019c.227 0 .44.019.638.05.316.05.594.125.801.318.207.187.328.392.409.557.113.218.169.43.193.627a.996.996 0 0 1-.156.71c-.125.141-.262.288-.43.463l-.113.112c-.156.156-.25.305-.173.482.087.187.347.562.719.995s.762.71 1.336 1.069c.594.347 1.009.519 1.281.574.364.074.638.062.853-.074s.409-.364.562-.627c.156-.293.276-.562.409-.813.156-.318.293-.563.44-.719.187-.173.374-.25.581-.202s.364.141.482.318c.141.202.173.44.141.71-.046.293-.141.562-.293.797z"/></svg>`,
      telegram: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.64 8.21l-2.368 11.083c-.16.751-.628.932-1.24.586l-3.623-2.662-1.742 1.675c-.192.192-.36.36-.694.36-.36 0-.45-.168-.612-.612l-1.13-3.698-3.442-1.07c-.75-.235-.75-.765.14-.99l10.867-4.216c.636-.246 1.202.153 1.003.939z"/></svg>`,
      mail: `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-6.623 5.712v-9.458l6.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l6.618-5.701v9.443l-6.618-3.742z"/></svg>`
  };
</script>

<section id="contact" class="min-h-screen w-full flex flex-col items-center justify-center py-16 px-6 sm:px-10 text-white">
  <h2 class="text-4xl sm:text-6xl font-bold mb-10 sm:mb-16 text-center text-teal-400">Let's Talk</h2>

  <!-- Contact Form -->
  <form on:submit={handleSubmit} class="w-full max-w-lg mb-16 space-y-6">
      <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
          <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
      </div>
      <div>
          <label for="message" class="block text-sm font-medium text-gray-300 mb-1">Message</label>
          <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="What's on your mind?"
              class="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          ></textarea>
      </div>
      <button
          type="submit"
          class="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500"
      >
          Send Message
      </button>
  </form>

  <!-- Social Links -->
  <div class="text-center">
      <p class="mb-6 text-lg text-gray-400">Connect with me:</p>
      <div class="flex justify-center space-x-6">
           <!-- Replace # with your actual profile links -->
           <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="GitHub">
               {@html icons.github}
           </a>
           <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="LinkedIn">
               {@html icons.linkedin}
           </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="WhatsApp">
                {@html icons.whatsapp}
            </a>
             <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="Telegram">
                {@html icons.telegram}
            </a>
           <a href="mailto:your.email@example.com" class="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="Email">
                {@html icons.mail}
           </a>
      </div>
  </div>
</section>