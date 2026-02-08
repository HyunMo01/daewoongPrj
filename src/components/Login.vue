<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signUp, signIn } from '../firebase/auth'

const router = useRouter()

const mode = ref('login') // 'login' or 'signup'
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

function switchMode() {
  mode.value = mode.value === 'login' ? 'signup' : 'login'
  error.value = ''
}

async function handleSubmit() {
  if (!email.value || !password.value) {
    error.value = '이메일과 비밀번호를 입력하세요.'
    return
  }

  if (password.value.length < 6) {
    error.value = '비밀번호는 최소 6자 이상이어야 합니다.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    if (mode.value === 'signup') {
      await signUp(email.value, password.value)
    } else {
      await signIn(email.value, password.value)
    }
    // 로그인 성공 시 router가 자동으로 home으로 이동
    router.push('/')
  } catch (err) {
    console.error(err)
    if (err.code === 'auth/email-already-in-use') {
      error.value = '이미 사용 중인 이메일입니다.'
    } else if (err.code === 'auth/invalid-email') {
      error.value = '유효하지 않은 이메일입니다.'
    } else if (err.code === 'auth/weak-password') {
      error.value = '비밀번호가 너무 약합니다.'
    } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      error.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
    } else if (err.code === 'auth/invalid-credential') {
      error.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
    } else if (err.code === 'auth/user-disabled') {
      error.value = '사용중지된 계정입니다.'
    } else {
      error.value = mode.value === 'signup' ? '회원가입에 실패했습니다.' : '로그인에 실패했습니다.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h1 class="title">제조를 위한 모든 것</h1>
        <p class="subtitle">설비 · 자재 · 품질 · 문서를 카테고리별로 관리하세요.</p>

        <div class="tabs">
          <button
            :class="['tab', { active: mode === 'login' }]"
            @click="mode = 'login'; error = ''"
          >
            로그인
          </button>
          <button
            :class="['tab', { active: mode === 'signup' }]"
            @click="mode = 'signup'; error = ''"
          >
            회원가입
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="form">
          <div v-if="error" class="error-message">{{ error }}</div>

          <div class="form-group">
            <label for="email">이메일</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="example@email.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">비밀번호</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="최소 6자 이상"
              autocomplete="current-password"
              required
            />
          </div>

          <button type="submit" class="btn-submit" :disabled="loading">
            {{ loading ? '처리 중...' : (mode === 'login' ? '로그인' : '회원가입') }}
          </button>
        </form>

        <p class="footer-text">
          {{ mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?' }}
          <button type="button" @click="switchMode" class="link-button">
            {{ mode === 'login' ? '회원가입' : '로그인' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.title {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: var(--text);
}

.subtitle {
  margin: 0 0 2rem 0;
  color: var(--text-muted);
  font-size: 0.9rem;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background: var(--bg);
  padding: 0.25rem;
  border-radius: 10px;
}

.tab {
  flex: 1;
  padding: 0.7rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.95rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.tab.active {
  background: var(--primary);
  color: white;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-message {
  background: rgba(220, 53, 69, 0.15);
  color: #dc3545;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
}

.btn-submit {
  margin-top: 0.5rem;
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  background: var(--primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer-text {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.link-button {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  margin-left: 0.25rem;
  text-decoration: underline;
}

.link-button:hover {
  opacity: 0.8;
}
</style>
