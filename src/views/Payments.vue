<template>
    <div>
      <h2>Potwierdzenie płatności</h2>
      <div v-if="!paymentConfirmed" class="payment-form">
        <form @submit.prevent="processPayment">
          <label for="cardNumber">Numer karty:</label>
          <input type="text" id="cardNumber" v-model="cardNumber" placeholder="Wprowadź numer karty" required>
  
          <label for="expiryDate">Data ważności:</label>
          <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/RR" required>
  
          <label for="cvc">CVC:</label>
          <input type="text" id="cvc" v-model="cvc" placeholder="CVC" required>
  
          <button type="submit" class="pay-button">Zapłać</button>
        </form>
      </div>
      <div v-if="paymentConfirmed" class="payment-confirmed">
        <p class="success-message">Dziękujemy za dokonanie płatności!</p>
        <p class="reservation-message">Twój samochód został zarezerwowany.</p>
      </div>
    </div>
  </template>
  
  <script>
  // Importujemy bibliotekę Stripe.js
  import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    data() {
      return {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        paymentConfirmed: false,
        stripe: null
      };
    },
    mounted() {
      // Ładujemy klucz publiczny Stripe
      loadStripe('TWÓJ_KLUCZ_PUBLICZNY_STRIPE').then((stripe) => {
        this.stripe = stripe;
      });
    },
    methods: {
      async processPayment() {
        try {
          console.log('Rozpoczęcie procesu płatności...');
          // Tworzymy płatność za pomocą Stripe
          const { error } = await this.stripe.createToken('card', {
            card: {
              number: this.cardNumber,
              exp_month: this.expiryDate.split('/')[0],
              exp_year: this.expiryDate.split('/')[1],
              cvc: this.cvc
            }
          });
  
          if (error) {
            console.error('Błąd podczas przetwarzania płatności:', error.message);
            return;
          }
  
          // Tutaj wyślij token płatności na serwer i przetwórz płatność
  
          // Po pomyślnym przetworzeniu płatności z serwera ustaw `paymentConfirmed` na true
          this.paymentConfirmed = true;

          // Jeśli użytkownik jest zalogowany, dodaj zamówienie do historii zamówień
          if (this.isLoggedIn) {
            const order = {
                cardNumber: this.cardNumber,
                expiryDate: this.expiryDate,
                cvc: this.cvc,
                // Dodaj inne dane zamówienia
            };
            // Zapisz zamówienie w localStorage
            localStorage.setItem('order', JSON.stringify(order));
        }
  
        } catch (err) {
          console.error('Błąd podczas przetwarzania płatności:', err);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styl dla komponentu Payments.vue */
  .payment-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .payment-form label {
    font-weight: bold;
  }
  
  .payment-form input[type="text"] {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .payment-form button.pay-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  
  .payment-form button.pay-button:hover {
    background-color: #0056b3;
  }
  
  .payment-confirmed {
    text-align: center;
    padding: 20px;
    background-color: #e6f7ec;
    border-radius: 5px;
  }
  
  .payment-confirmed p {
    margin-bottom: 10px;
  }
  
  .payment-confirmed .success-message {
    color: #198754;
    font-weight: bold;
  }
  
  .payment-confirmed .reservation-message {
    color: #0dcaf0;
  }
  </style>
  