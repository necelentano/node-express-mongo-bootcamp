/* eslint-disable no-alert, no-console */
import axios from 'axios';

import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (result.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

/* eslint-disable no-alert, no-console */
