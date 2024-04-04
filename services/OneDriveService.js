// services/OneDriveService.js
import { fetch } from 'react-native-fetch'; // Placeholder, use a proper fetch library

const oneDriveImport = async (accessToken) => {
  const response = await fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const files = await response.json();
  return files;
};

export { oneDriveImport };
