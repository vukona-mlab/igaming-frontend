// Centralized API service for profile and error handling
export async function fetchUserProfile({ uid, token, BACKEND_URL }) {
  const response = await fetch(`${BACKEND_URL}/user/profile/${uid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    // Attach status for error handling
    const error = new Error(data.message || 'Failed to fetch profile');
    error.status = response.status;
    error.code = data.code;
    error.missingFields = data.missingFields;
    throw error;
  }
  return data;
}
