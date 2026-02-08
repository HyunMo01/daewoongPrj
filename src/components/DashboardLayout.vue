<script setup>
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div class="dashboard-layout">
    <Sidebar />
    
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  background: var(--bg);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
}
</style>
