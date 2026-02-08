<script setup>
import CategoryManager from './CategoryManager.vue'
import ImageUpload from './ImageUpload.vue'
</script>

<template>
  <div class="home">
    <main>
      <CategoryManager />
      <ImageUpload />
    </main>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
</style>
