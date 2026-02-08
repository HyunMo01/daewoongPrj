<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const route = useRoute()

const menuSections = ref([
  {
    id: 'basic',
    title: '[기본 관리]',
    items: [
      {
        id: 'image-management',
        name: '카테고리 관리',
        path: '/'
      }
    ]
  },
  {
    id: 'ai',
    title: '[AI 기능]',
    items: [
      {
        id: 'image-search',
        name: '이미지 검색',
        path: '/image-search'
      }
    ]
  }
])

function isActive(path) {
  return route.path === path
}

function navigateTo(path) {
  router.push(path)
  emit('close') // Close sidebar on mobile after navigation
}
</script>

<template>
  <div :class="['sidebar', { 'sidebar-open': isOpen }]">
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="/logo.png" alt="Daewoong Logo" class="logo-image" />        
      </div>
      <button class="close-btn" @click="emit('close')">✕</button>
    </div>

    <nav class="menu">
      <div 
        v-for="section in menuSections" 
        :key="section.id" 
        class="menu-section"
      >
        <div class="section-header">{{ section.title }}</div>
        <button
          v-for="item in section.items"
          :key="item.id"
          :class="['menu-item', { active: isActive(item.path) }]"
          @click="navigateTo(item.path)"
        >
          {{ item.name }}
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: var(--card-bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 100;
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid var(--border);
  position: relative;
}

.close-btn {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
}

.close-btn:hover {
  color: var(--text);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
  
  .close-btn {
    display: block;
  }
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.company-name {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.5px;
}

.menu {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
}

.menu-section {
  margin-bottom: 1.5rem;
}

.menu-section:last-child {
  margin-bottom: 0;
}

.section-header {
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: var(--bg);
  color: var(--primary);
}

.menu-item.active {
  background: rgba(var(--primary-rgb, 102, 126, 234), 0.1);
  color: var(--primary);
  border-left-color: var(--primary);
  font-weight: 600;
}
</style>
