import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where
} from 'firebase/firestore'
import { db } from './config'

const IMAGES_COLLECTION = 'images'
/** Firestore 문서 크기 제한 1MB. base64는 약 1.33배 커지므로 700KB 이하로 압축 */
const MAX_DATA_SIZE = 700 * 1024

/**
 * 이미지를 캔버스로 리사이즈·압축해 base64 반환 (용량 제한 준수)
 */
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const maxSide = 800
      let w = img.width
      let h = img.height
      if (w > maxSide || h > maxSide) {
        if (w > h) {
          h = (h * maxSide) / w
          w = maxSide
        } else {
          w = (w * maxSide) / h
          h = maxSide
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
      let quality = 0.85
      const tryExport = () => {
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        const base64 = dataUrl.split(',')[1]
      const size = base64 ? (base64.length * 3) / 4 : 0
        if (size <= MAX_DATA_SIZE || quality <= 0.3) {
          resolve({ dataUrl, size })
          return
        }
        quality -= 0.15
        if (quality < 0.3) {
          resolve({ dataUrl, size })
          return
        }
        tryExport()
      }
      tryExport()
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('이미지를 읽을 수 없습니다.'))
    }
    img.src = url
  })
}

/**
 * 카테고리별 이미지 목록 조회
 */
export async function getImagesByCategory(categoryId) {
  const q = query(
    collection(db, IMAGES_COLLECTION),
    where('categoryId', '==', categoryId)
  )
  const snapshot = await getDocs(q)
  const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
  return list
}

/**
 * 이미지 업로드 (Firestore에 base64 저장, Storage 미사용)
 */
export async function uploadImage(categoryId, file, title = '') {
  const { dataUrl } = await compressImage(file)
  const docRef = await addDoc(collection(db, IMAGES_COLLECTION), {
    categoryId,
    url: dataUrl,
    title: title || file.name,
    fileName: file.name,
    createdAt: new Date().toISOString()
  })
  return {
    id: docRef.id,
    categoryId,
    url: dataUrl,
    title: title || file.name,
    createdAt: new Date().toISOString()
  }
}

/**
 * 이미지 삭제 (Firestore만)
 */
export async function deleteImage(imageDoc) {
  await deleteDoc(doc(db, IMAGES_COLLECTION, imageDoc.id))
}
