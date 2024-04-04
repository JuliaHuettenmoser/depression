// services/DropboxService.js
import { fetch } from 'react-native-fetch'; // Placeholder, use a proper fetch library

const dropboxImport = async (accessToken) => {
  const response = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: '', // Root path to start listing files from
      recursive: false,
    }),
  });
  const files = await response.json();
  return files;
};

export { dropboxImport };
