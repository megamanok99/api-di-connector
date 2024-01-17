import fetch from 'node-fetch';
export async function fetchSwagger(url) {
  try {
    if (!url || typeof url !== 'string') {
      throw new Error('🟡:Invalid URL');
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`🔴:failed to fetch Swagger from ${url}. Status: ${response.status}`);
    } else {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error('🔴:error fetching Swagger:', error.message);
  }
}
