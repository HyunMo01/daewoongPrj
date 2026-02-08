<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

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
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="/logo.png" alt="Daewoong Logo" class="logo-image" />        
      </div>
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
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid var(--border);
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
