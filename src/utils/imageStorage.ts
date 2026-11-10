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

/**
 * 1~66번 등록된 사진 데이터를 백업 JSON 파일로 다운로드합니다.
 * (GitHub Pages나 다른 컴퓨터로 사진을 옮길 때 1초 만에 복원 가능)
 */
export function exportTermImagesJson(images: Record<number, string>): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(images, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `semi_glossary_images_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * 백업 JSON 파일로부터 사진 데이터를 복원하여 IndexedDB에 저장합니다.
 */
export async function importTermImagesFromJson(jsonString: string): Promise<Record<number, string>> {
  const parsed = JSON.parse(jsonString) as Record<string | number, string>;
  const result: Record<number, string> = {};

  for (const [key, dataUrl] of Object.entries(parsed)) {
    const no = Number(key);
    if (!isNaN(no) && no >= 1 && typeof dataUrl === 'string') {
      await saveTermImage(no, dataUrl);
      result[no] = dataUrl;
    }
  }

  return result;
}

