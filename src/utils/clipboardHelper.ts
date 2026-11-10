/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Extract image data URL from a ClipboardEvent (Ctrl+V / Cmd+V)
 */
export async function extractImageFromPasteEvent(e: ClipboardEvent): Promise<string | null> {
  const items = e.clipboardData?.items;
  if (!items || items.length === 0) return null;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (!file) continue;
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }
  return null;
}

/**
 * Read image directly from navigator.clipboard API
 */
export async function readImageFromClipboard(): Promise<string | null> {
  if (!navigator.clipboard || !navigator.clipboard.read) {
    throw new Error('UNSUPPORTED');
  }

  const items = await navigator.clipboard.read();
  for (const item of items) {
    for (const type of item.types) {
      if (type.startsWith('image/')) {
        const blob = await item.getType(type);
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
    }
  }
  return null;
}
