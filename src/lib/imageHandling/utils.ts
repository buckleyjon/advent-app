export function generateImageFileName(originalName: string): string {
  const fileExt = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}.${fileExt}`;
}

export function sanitizeImageUrl(url: string): string {
  if (!url) return '';
  
  // Ensure HTTPS
  let sanitized = url.replace('http://', 'https://');
  
  // Remove any duplicate storage paths
  const storagePathRegex = /\/storage\/v1\/object\/public\/calendar-images\//g;
  const matches = sanitized.match(storagePathRegex);
  
  if (matches && matches.length > 1) {
    // Keep only the last occurrence of the storage path
    const parts = sanitized.split(storagePathRegex);
    sanitized = `https://` + parts.pop();
  }
  
  return sanitized;
}