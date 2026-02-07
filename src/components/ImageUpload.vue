<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '../firebase/categories'
import { getImagesByCategory, uploadImage, deleteImage } from '../firebase/images'

const categories = ref([])
const selectedCategoryId = ref('')
const images = ref([])
const title = ref('')
const fileInput = ref(null)
const uploading = ref(false)
const loading = ref(false)
const error = ref('')

async function loadCategories() {
  error.value = ''
  try {
    categories.value = await getCategories()
    if (categories.value.length && !selectedCategoryId.value) {
      selectedCategoryId.value = categories.value[0].id
    }
    if (categories.value.length && selectedCategoryId.value) {
      const exists = categories.value.some((c) => c.id === selectedCategoryId.value)
      if (!exists) selectedCategoryId.value = categories.value[0].id
    }
  } catch (e) {
    error.value = '카테고리를 불러오지 못했습니다.'
    console.error(e)
  }
}

async function loadImages() {
  if (!selectedCategoryId.value) {
    images.value = []
    return
  }
  loading.value = true
  error.value = ''
  try {
    images.value = await getImagesByCategory(selectedCategoryId.value)
  } catch (e) {
    error.value = '이미지 목록을 불러오지 못했습니다. Firestore 인덱스가 필요할 수 있습니다.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

function onCategoryChange() {
  loadImages()
}

async function triggerUpload() {
  fileInput.value?.click()
}

async function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file || !selectedCategoryId.value) return
  if (!file.type.startsWith('image/')) {
    error.value = '이미지 파일만 업로드할 수 있습니다.'
    return
  }
  uploading.value = true
  error.value = ''
  try {
    await uploadImage(selectedCategoryId.value, file, title.value || undefined)
    title.value = ''
    await loadImages()
  } catch (err) {
    error.value = '업로드에 실패했습니다. Firestore 규칙을 확인하세요.'
    console.error(err)
  } finally {
    uploading.value = false
    e.target.value = ''
  }
}

async function remove(img) {
  if (!confirm('이 이미지를 삭제할까요?')) return
  loading.value = true
  error.value = ''
  try {
    await deleteImage(img)
    await loadImages()
  } catch (e) {
    error.value = '삭제에 실패했습니다.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadCategories()
  await loadImages()
})
</script>

<template>
  <section class="image-upload">
    <h2>카테고리별 이미지</h2>
    <p class="subtitle">카테고리를 선택한 뒤 이미지를 업로드하세요.</p>

    <div v-if="error" class="message error">{{ error }}</div>

    <div class="toolbar">
      <select
        v-model="selectedCategoryId"
        @change="onCategoryChange"
        @focus="loadCategories"
        class="select"
      >
        <option value="">카테고리 선택</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>      
      <input
        v-model="title"
        type="text"
        placeholder="이미지 제목 (선택)"
        class="title-input"
      />
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      />
      <button
        type="button"
        class="btn-upload"
        :disabled="!selectedCategoryId || uploading"
        @click="triggerUpload"
      >
        {{ uploading ? '업로드 중...' : '이미지 선택' }}
      </button>
    </div>

    <div v-if="loading" class="loading">이미지 불러오는 중...</div>
    <div v-else class="gallery">
      <div
        v-for="img in images"
        :key="img.id"
        class="gallery-item"
      >
        <img :src="img.url" :alt="img.title" loading="lazy" />
        <div class="caption">{{ img.title }}</div>
        <button type="button" class="btn-remove" @click="remove(img)">삭제</button>
      </div>
    </div>
    <p v-if="!loading && selectedCategoryId && images.length === 0" class="empty">
      이 카테고리에 등록된 이미지가 없습니다.
    </p>
  </section>
</template>

<style scoped>
.image-upload {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
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
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.select {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  min-width: 160px;
}
.title-input {
  flex: 1;
  min-width: 140px;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
}
.hidden {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}
.btn-upload {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  cursor: pointer;
}
.btn-upload:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-refresh {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.9rem;
  cursor: pointer;
}
.btn-refresh:hover {
  background: var(--border);
}
.loading, .empty {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
.gallery-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg);
  border: 1px solid var(--border);
}
.gallery-item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}
.caption {
  padding: 0.5rem 0.6rem;
  font-size: 0.85rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gallery-item .btn-remove {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.75rem;
  border: none;
  border-radius: 6px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  cursor: pointer;
}
.gallery-item .btn-remove:hover {
  background: #dc3545;
}
</style>
