<script setup>
import CategoryManager from './components/CategoryManager.vue'
import ImageUpload from './components/ImageUpload.vue'
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>제조를 위한 모든 것</h1>
      <p class="tagline">설비 · 자재 · 품질 · 문서를 카테고리별로 관리하세요.</p>
    </header>

    <main>
      <CategoryManager />
      <ImageUpload />
    </main>

    <footer class="footer">
      <p>Vue + Firebase · 추후 앱 확장 예정..</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}
.header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.tagline {
  margin: 0;
  color: var(--text-muted);
  font-size: 1rem;
}
.footer {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
