/**
 * 66개 용어별 사용자 실제 이미지 (시트 이미지/현장 사진) 저장을 위한 IndexedDB 유틸리티
 * 브라우저 로컬 DB에 고화질 이미지를 용량 제한(localStorage 5MB 한계 극복) 없이 안전하게 영구 저장합니다.
 */

const DB_NAME = 'SemiconductorGlossaryDB';
const DB_VERSION = 1;
const STORE_NAME = 'term_images';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB is not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'no' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveTermImage(no: number, dataUrl: string, fileName?: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ no, dataUrl, fileName, updatedAt: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllTermImages(): Promise<Record<number, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const result: Record<number, string> = {};
        for (const item of request.result) {
          result[item.no] = item.dataUrl;
        }
        resolve(result);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error('Failed to get images from IndexedDB', e);
    return {};
  }
}

export async function deleteTermImage(no: number): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(no);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearAllTermImages(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
