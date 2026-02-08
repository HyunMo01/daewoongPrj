<script setup>
import Sidebar from './Sidebar.vue'

const props = defineProps({
  isSidebarOpen: Boolean
})

const emit = defineEmits(['closeSidebar'])

function closeSidebar() {
  emit('closeSidebar')
}
</script>

<template>
  <div class="dashboard-layout">
    <!-- Overlay for mobile -->
    <div 
      v-if="isSidebarOpen" 
      class="sidebar-overlay"
      @click="closeSidebar"
    ></div>
    
    <Sidebar :isOpen="isSidebarOpen" @close="closeSidebar" />
    
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  background: var(--bg);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
  }
  
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
}
</style>
