import axios from 'axios';

const logout = async () => {
  try {
    // 1. Send logout request to backend
    await axios.post('/api/auth/logout', {}, { 
      withCredentials: true 
    });

    // 2. Clear client-side storage
    localStorage.removeItem('authState');
    sessionStorage.clear();

    // 3. Return success status
    return { success: true };
  } catch (err) {
    console.error('Logout error:', err);
    return { success: false, error: err.message };
  }
};

export default logout;
