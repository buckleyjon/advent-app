import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = 'defwziusr'; // Replace with your cloud name
const uploadPreset = 'advent'; // Replace with your upload preset

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName,
  },
});

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.secure_url;
}