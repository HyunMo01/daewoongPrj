<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { onAuthChanged, logOut } from './firebase/auth'

const router = useRouter()
const route = useRoute()
const user = ref(null)
const isSidebarOpen = ref(false)

const pageTitle = computed(() => route.meta?.title || '제조를 위한 모든 것')
const pageDescription = computed(() => route.meta?.description || '설비 · 자재 · 품질 · 문서 등 카테고리를 관리하세요.')

onMounted(() => {
  onAuthChanged((authUser) => {
    user.value = authUser
  })
})

async function handleLogout() {
  try {
    await logOut()
    router.push('/login')
  } catch (err) {
    console.error('로그아웃 실패:', err)
    alert('로그아웃에 실패했습니다.')
  }
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="app">
    <header v-if="route.path !== '/login' && user" class="header">
      <button class="hamburger-btn" @click="toggleSidebar">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div class="header-content">
        <div class="header-title">
          <h1>{{ pageTitle }}</h1>
          <p class="tagline">{{ pageDescription }}</p>
        </div>
        <div class="user-section">
          <span class="user-email">{{ user.email }}</span>
          <button @click="handleLogout" class="btn-logout">로그아웃</button>
        </div>
      </div>
    </header>

    <main :class="{ 'with-header': route.path !== '/login' && user, 'no-header': route.path === '/login' }">
      <router-view 
        :isSidebarOpen="isSidebarOpen"
        @closeSidebar="closeSidebar"
      />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  margin-left: 250px;
  width: calc(100% - 250px);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hamburger-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-btn span {
  width: 24px;
  height: 3px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s;
}

.hamburger-btn:hover span {
  background: var(--primary);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex: 1;
}

.header-title h1 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

.header-title .tagline {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
}

.user-email {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.btn-logout {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: var(--border);
}

main {
  flex: 1;
}

main.with-header {
  padding-top: 70px;
}

main.no-header {
  padding: 0;
}

@media (max-width: 768px) {
  .header {
    margin-left: 0;
    width: 100%;
    padding: 0.75rem 1rem;
  }
  
  .hamburger-btn {
    display: flex;
    flex-shrink: 0;
  }
  
  .header-content {
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  
  .header-title {
    flex: 1;
    min-width: 0;
  }
  
  .header-title h1 {
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .header-title .tagline {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .user-section {
    gap: 0.5rem;
  }
  
  .user-email {
    display: none;
  }
  
  .btn-logout {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>
