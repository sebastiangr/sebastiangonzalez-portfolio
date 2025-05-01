<!-- src/lib/sections/AboutMe.svelte -->
<section id="about-me" class="w-full flex flex-col items-center justify-center py-16 px-6 sm:px-10 text-white">
  <h2 class="text-4xl sm:text-5xl font-bold mb-10 sm:mb-16 text-center">About Me</h2>
  <div class="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">
      <div class="w-full md:w-1/2 text-lg text-gray-700 space-y-4 text-center md:text-left">
           <p>
               Welcome! I'm [Your Name], a passionate [Your Role] based in [Your Location]. I specialize in creating dynamic and user-friendly web experiences.
           </p>
           <p>
               With a background in [Your Field/Study] and several years of experience, I've honed my skills in [Mention 2-3 Key Skills, e.g., front-end development, UI/UX design, backend logic]. I love tackling challenging problems and turning complex ideas into elegant solutions.
           </p>
           <p>
               When I'm not coding, you can find me [Your Hobby 1], [Your Hobby 2], or exploring the latest technology trends.
           </p>
      </div>
      <div class="w-full md:w-1/2 flex justify-center">
           <!-- Placeholder Photo - Replace with your actual photo -->
           <img
               src="https://via.placeholder.com/400x400/cccccc/888888?text=Your+Photo"
               alt="Portrait of [Your Name]"
               class="rounded-lg shadow-lg w-64 h-64 sm:w-80 sm:h-80 object-cover"
           />
           <!-- Example using SvelteKit static assets:
           <img src="/images/your-photo.jpg" alt="Portrait of [Your Name]" class="rounded-lg shadow-lg w-80 h-80 object-cover" />
           -->
      </div>
  </div>
</section>