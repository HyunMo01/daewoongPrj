<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = ref([
  {
    id: 'image-management',
    name: '카테고리 관리',
    icon: '📁',
    path: '/'
  },
  {
    id: 'image-search',
    name: '이미지검색',
    icon: '🔍',
    path: '/image-search'
  }
  // 향후 추가할 메뉴들
  // {
  //   id: 'settings',
  //   name: '설정',
  //   icon: '⚙️',
  //   path: '/settings'
  // }
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
      <button
        v-for="item in menuItems"
        :key="item.id"
        :class="['menu-item', { active: isActive(item.path) }]"
        @click="navigateTo(item.path)"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="name">{{ item.name }}</span>
      </button>
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
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.menu-item:hover {
  background: var(--bg);
}

.menu-item.active {
  background: var(--primary);
  color: white;
}

.menu-item .icon {
  font-size: 1.2rem;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item .name {
  flex: 1;
  font-weight: 500;
}
</style>
