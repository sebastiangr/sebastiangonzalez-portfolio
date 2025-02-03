<script lang="ts">
  import Logo from "$lib/assets/sebastiangonzalez.co-logo.svg";
  import IconLinkedin from "$lib/assets/icon-linkedin.svg";
  import IconWhatsapp from "$lib/assets/icon-whatsapp.svg";
  import IconMail from "$lib/assets/icon-mail.svg";
  import IconGithub from "$lib/assets/icon-github.svg";
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Gelasio" rel="stylesheet">
</svelte:head>

<div class="text-center m-12">

  <img src={Logo} alt="Sebastian Gonzalez Logo" class="w-32 h-32 mx-auto mt-8 mb-8 transition duration-1000 ease-in-out hover:rotate-180" />

  <h1 class="text-2xl sm:text-4xl mb-4 uppercase">I'm Sebastián, <br>a freelance web and app developer</h1>
  <p class="animate-pulse mb-10">This web is under construction... come back soon</p>

  <h2 class="text-xl sm:text-2xl mt-8 mb-4">GET IN TOUCH</h2>
  <div class="flex justify-center">
    <a href="mailto:sebastiangr@proton.me" target="_blank" rel="noopener noreferrer" class="m-4 transition duration-500 ease-in-out hover:scale-110">
      <img src={IconMail} width="40" height="40" />
    </a>
    <a href="https://wa.me/573003060724" target="_blank" rel="noopener noreferrer" class="m-4 transition duration-500 ease-in-out hover:scale-110">
      <img src={IconWhatsapp} width="40" height="40" />
    </a>    
    <a href="https://github.com/sebastiangr" target="_blank" rel="noopener noreferrer" class="m-4 transition duration-500 ease-in-out hover:scale-110">
      <img src={IconGithub} width="40" height="40" />
    </a> 
    <a href="https://www.linkedin.com/in/sebastiangonzalez-co/" target="_blank" rel="noopener noreferrer" class="m-4 transition duration-500 ease-in-out hover:scale-110">
      <img src={IconLinkedin} width="40" height="40" />
    </a>
  </div>
</div>
