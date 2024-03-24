const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/token`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export const getUsers = async (page = 1, count = 6) => {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}&count=${count}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getPositions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/positions`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw error;
  }
};

export const registerUser = async (data, token) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: data,
      headers: {
        'Token': token,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
