import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from './config'

const CATEGORIES_COLLECTION = 'categories'

/**
 * 카테고리 목록 조회
 */
export async function getCategories() {
  const q = query(
    collection(db, CATEGORIES_COLLECTION),
    orderBy('order', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * 카테고리 추가
 */
export async function addCategory(name, description = '') {
  const categories = await getCategories()
  const order = categories.length
  const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
    name,
    description,
    order,
    createdAt: new Date().toISOString()
  })
  return { id: docRef.id, name, description, order }
}

/**
 * 카테고리 수정
 */
export async function updateCategory(id, data) {
  await updateDoc(doc(db, CATEGORIES_COLLECTION, id), data)
}

/**
 * 카테고리 삭제
 */
export async function deleteCategory(id) {
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, id))
}
