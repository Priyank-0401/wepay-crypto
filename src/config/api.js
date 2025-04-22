// API Configuration

// Base URL for all API requests
// Change this to match your server configuration
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost/wepay-crypto/server/api'
  : '/wepay-crypto/server/api'; // When deployed to production

// API endpoints
const API_ENDPOINTS = {
  CREATE_REQUEST: `${API_BASE_URL}/requests/create_request.php`,
  GET_REQUESTS: `${API_BASE_URL}/requests/get_requests.php`,
  UPDATE_REQUEST: `${API_BASE_URL}/requests/update_request.php`,
};

export { API_BASE_URL, API_ENDPOINTS }; 