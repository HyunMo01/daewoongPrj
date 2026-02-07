<script setup>
import { ref, onMounted } from 'vue'
import { getCategories, addCategory, deleteCategory } from '../firebase/categories'

const categories = ref([])
const newName = ref('')
const newDesc = ref('')
const loading = ref(false)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    categories.value = await getCategories()
  } catch (e) {
    error.value = '카테고리 목록을 불러오지 못했습니다. Firebase 설정을 확인하세요.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function add() {
  const name = newName.value?.trim()
  if (!name) return
  loading.value = true
  error.value = ''
  try {
    await addCategory(name, newDesc.value?.trim())
    newName.value = ''
    newDesc.value = ''
    await load()
  } catch (e) {
    error.value = '카테고리 추가에 실패했습니다.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function remove(id) {
  if (!confirm('이 카테고리를 삭제할까요? (해당 카테고리의 이미지 목록만 삭제되며, Storage 이미지는 유지됩니다)')) return
  loading.value = true
  error.value = ''
  try {
    await deleteCategory(id)
    await load()
  } catch (e) {
    error.value = '카테고리 삭제에 실패했습니다.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <section class="category-manager">
    <h2>카테고리 관리</h2>
    <p class="subtitle">제조 항목별로 이미지를 분류할 카테고리를 만드세요.</p>

    <div v-if="error" class="message error">{{ error }}</div>

    <form @submit.prevent="add" class="form">
      <input
        v-model="newName"
        type="text"
        placeholder="카테고리 이름 (예: 설비, 자재, 품질)"
        required
      />
      <input
        v-model="newDesc"
        type="text"
        placeholder="설명 (선택)"
        class="desc"
      />
      <button type="submit" :disabled="loading">추가</button>
    </form>

    <div v-if="loading && !categories.length" class="loading">불러오는 중...</div>
    <ul v-else class="category-list">
      <li v-for="cat in categories" :key="cat.id" class="category-item">
        <span class="name">{{ cat.name }}</span>
        <span v-if="cat.description" class="desc">{{ cat.description }}</span>
        <button type="button" class="btn-remove" @click="remove(cat.id)" :disabled="loading">삭제</button>
      </li>
    </ul>
    <p v-if="!loading && categories.length === 0" class="empty">카테고리를 먼저 추가해 주세요.</p>
  </section>
</template>

<style scoped>
.category-manager {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}
h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
}
.subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}
.message.error {
  background: rgba(220, 53, 69, 0.15);
  color: #dc3545;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.form input[type="text"] {
  flex: 1;
  min-width: 140px;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
}
.form input.desc {
  flex: 1;
  min-width: 120px;
}
.form button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
}
.form button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.loading, .empty {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.category-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  background: var(--bg);
  margin-bottom: 0.5rem;
}
.category-item .name {
  font-weight: 600;
  min-width: 120px;
}
.category-item .desc {
  color: var(--text-muted);
  font-size: 0.85rem;
  flex: 1;
}
.btn-remove {
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
}
.btn-remove:hover:not(:disabled) {
  color: #dc3545;
  border-color: #dc3545;
}
.btn-remove:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
