export interface ImageUploadResult {
  url: string;
  path: string;
}

export interface ImageCompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
}