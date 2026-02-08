<script setup>
import CategoryManager from './CategoryManager.vue'
import ImageUpload from './ImageUpload.vue'
</script>

<template>
  <div class="image-management">
    <CategoryManager />
    <ImageUpload />
  </div>
</template>

<style scoped>
.image-management {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
