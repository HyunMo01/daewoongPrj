<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { onAuthChanged, logOut } from './firebase/auth'

const router = useRouter()
const route = useRoute()
const user = ref(null)

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
</script>

<template>
  <div class="app">
    <header v-if="route.path !== '/login'" class="header">
      <div class="header-content">
        <div>
          <h1>제조를 위한 모든 것</h1>
          <p class="tagline">설비 · 자재 · 품질 · 문서를 카테고리별로 관리하세요.</p>
        </div>
        <div v-if="user" class="user-section">
          <span class="user-email">{{ user.email }}</span>
          <button @click="handleLogout" class="btn-logout">로그아웃</button>
        </div>
      </div>
    </header>

    <main :class="{ 'no-header': route.path === '/login' }">
      <router-view />
    </main>

    <footer v-if="route.path !== '/login'" class="footer">
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
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
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
.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
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
main.no-header {
  margin-top: 0;
  padding: 0;
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
