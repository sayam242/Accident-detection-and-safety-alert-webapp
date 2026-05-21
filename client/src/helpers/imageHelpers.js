/**
 * Image helper utilities
 * - fileToDataURL(file)
 * - dataURLToBlob(dataURL)
 * - blobToFile(blob, filename, mimeType)
 * - getImageDimensionsFromFile(file)
 * - compressImageFile(file, { maxWidth, maxHeight, quality })
 * - resizeDataURL(dataURL, { maxWidth, maxHeight, quality })
 */

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

export async function fileToDataURL(file) {
  if (!(file instanceof Blob)) throw new TypeError('file must be a Blob/File');
  return readFileAsDataURL(file);
}

export function dataURLToBlob(dataURL) {
  const parts = dataURL.split(',');
  const meta = parts[0];
  const base64 = parts[1];
  const mime = (meta.match(/:([^;]+);/) || [])[1] || 'image/png';
  const binary = atob(base64);
  const len = binary.length;
  const u8 = new Uint8Array(len);
  for (let i = 0; i < len; i++) u8[i] = binary.charCodeAt(i);
  return new Blob([u8], { type: mime });
}

export function blobToFile(blob, filename = 'image.jpg') {
  try {
    return new File([blob], filename, { type: blob.type });
  } catch (e) {
    // Fallback for environments without File constructor
    blob.name = filename;
    return blob;
  }
}

export async function getImageDimensionsFromFile(file) {
  const dataUrl = await fileToDataURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = (err) => reject(err || new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

function createImageFromDataURL(dataURL) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to create image'));
    img.src = dataURL;
  });
}

export async function resizeDataURL(dataURL, { maxWidth = 1024, maxHeight = 1024, quality = 0.85 } = {}) {
  const img = await createImageFromDataURL(dataURL);
  let { width, height } = img;

  // calculate target size while preserving aspect ratio
  const aspect = width / height;
  if (width > maxWidth) {
    width = maxWidth;
    height = Math.round(width / aspect);
  }
  if (height > maxHeight) {
    height = maxHeight;
    width = Math.round(height * aspect);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  const mime = 'image/jpeg';
  return canvas.toDataURL(mime, quality);
}

export async function compressImageFile(file, { maxWidth = 1024, maxHeight = 1024, quality = 0.85, filename } = {}) {
  const dataUrl = await fileToDataURL(file);
  const resizedDataUrl = await resizeDataURL(dataUrl, { maxWidth, maxHeight, quality });
  const blob = dataURLToBlob(resizedDataUrl);
  return blobToFile(blob, filename || file.name || 'image.jpg');
}

export function isImageFile(file) {
  return file && file.type && file.type.startsWith('image/');
}

export default {
  fileToDataURL,
  dataURLToBlob,
  blobToFile,
  getImageDimensionsFromFile,
  resizeDataURL,
  compressImageFile,
  isImageFile,
};
