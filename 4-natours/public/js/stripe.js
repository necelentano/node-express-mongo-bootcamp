/* eslint-disable no-alert, no-console */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51IsWJpJn5OeU2bB5TQ4qCq3EEfLBrYHV10hvGjFKmiEMti2l4BHfPOvN5tvuRf5BAZgKV3CbFSrgroTPHNB8MMHG00Wg9lwFMS'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
