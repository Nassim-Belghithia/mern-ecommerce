const API_BASE_URL = process.env.REACT_APP_API_URL || "http://135.116.215.126:5000/api";

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Set token in localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Set user in localStorage
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove user from localStorage
export const removeUser = () => {
  localStorage.removeItem('user');
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (name, email, password) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },
};

// Products API
export const productsAPI = {
  getAll: async (category = null) => {
    const url = category ? `/products?category=${category}` : '/products';
    return apiRequest(url);
  },

  getById: async (id) => {
    return apiRequest(`/products/${id}`);
  },
};

// Cart API
export const cartAPI = {
  get: async () => {
    return apiRequest('/cart');
  },

  add: async (productId) => {
    return apiRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },

  remove: async (productId) => {
    return apiRequest('/cart/remove', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },

  update: async (productId, quantity) => {
    return apiRequest('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  clear: async () => {
    return apiRequest('/cart/clear', {
      method: 'DELETE',
    });
  },
};

