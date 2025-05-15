<script>
	import SectionTitle from "$lib/components/SectionTitle.svelte";

</script>
<!-- src/lib/sections/AboutMe.svelte -->
<section id="" class="w-full flex flex-col items-center justify-center py-16 px-6 sm:px-10 text-white">
  <!-- TODO: Typewriter effect -->
  <!-- <h2 class="text-4xl sm:text-5xl font-bold mb-10 sm:mb-16 text-center">About Me</h2> -->
  <!-- <SectionTitle number="01" title="About Me" align="centered" speedNumber={1.2} speedTitle={0.7} /> -->
  
  <div class="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">
      <div class="w-full md:w-1/2 text-lg text-gray-700 space-y-4 text-center md:text-left">
            <p><a href="/contacto">Go to Contact</a></p>
           <p>
               Welcome! I'm [Your Name], a passionate [Your Role] based in [Your Location]. I specialize in creating dynamic and user-friendly web experiences.
           </p>
           <p>
               With a background in [Your Field/Study] and several years of experience, I've honed my skills in [Mention 2-3 Key Skills, e.g., front-end development, UI/UX design, backend logic]. I love tackling challenging problems and turning complex ideas into elegant solutions.
           </p>
           <p>
               When I'm not coding, you can find me [Your Hobby 1], [Your Hobby 2], or exploring the latest technology trends.
           </p>
           <p>
               I'm fascinated by [Technology/Field] and enjoy learning new things, especially if they involve [Specific Interest].
           </p>
           <p>
               I'm always looking for new opportunities to grow and share my knowledge with others. If you're interested in collaborating or discussing a project, feel free to <a href="mailto:[Your Email]" class="text-blue-500 hover:text-blue-700">reach out</a>.
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
  <div class="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 mt-16">
      <div class="w-full md:w-1/2 text-lg text-gray-700 space-y-4 text-center md:text-left">
           <p>
               I'm proud to have worked on [Project/Company], a [brief description] that [achievement]. I was responsible for [specific contribution].
           </p>
           <p>
               I'm also a strong believer in [aspect of your personal brand]. I think it's essential for [related benefit].
           </p>
           <p>
               As a developer, I'm committed to [specific value or principle]. I believe it's crucial for [related outcome].
           </p>
      </div>
      <div class="w-full md:w-1/2 flex justify-center">
           <!-- Placeholder Image - Replace with your actual image -->
           <img
               src="https://via.placeholder.com/400x300/cccccc/888888?text=Your+Image"
               alt="Your Image"
               class="rounded-lg shadow-lg w-64 h-48 sm:w-80 sm:h-60 object-cover"
           />
           <!-- Example using SvelteKit static assets:
           <img src="/images/your-image.jpg" alt="Your Image" class="rounded-lg shadow-lg w-80 h-60 object-cover" />
           -->
      </div>
  </div>
</section>
