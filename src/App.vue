<script setup lang="ts"></script>

<template>
  <header class="flex items-center bg-slate-400 justify-center h-20">Header</header>
  <div class="flex grow">
    <RouterView />
  </div>
  <footer class="flex items-center bg-slate-400 justify-center h-20">Footer</footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
