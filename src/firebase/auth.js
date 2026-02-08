import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from './config'

/**
 * 회원가입
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<UserCredential>}
 */
export async function signUp(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password)
}

/**
 * 로그인
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<UserCredential>}
 */
export async function signIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
}

/**
 * 로그아웃
 * @returns {Promise<void>}
 */
export async function logOut() {
    return await signOut(auth)
}

/**
 * 인증 상태 변경 리스너
 * @param {function} callback - 사용자 상태가 변경될 때 호출될 콜백 함수
 * @returns {function} unsubscribe 함수
 */
export function onAuthChanged(callback) {
    return onAuthStateChanged(auth, callback)
}

/**
 * 현재 로그인한 사용자 가져오기
 * @returns {User | null}
 */
export function getCurrentUser() {
    return auth.currentUser
}
