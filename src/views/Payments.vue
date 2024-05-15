<template>
    <div>
      <h2>Potwierdzenie płatności</h2>
      <div v-if="!paymentConfirmed">
        <form @submit.prevent="processPayment">
          <label for="cardNumber">Numer karty:</label>
          <input type="text" id="cardNumber" v-model="cardNumber" placeholder="Wprowadź numer karty" required>
  
          <label for="expiryDate">Data ważności:</label>
          <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/RR" required>
  
          <label for="cvc">CVC:</label>
          <input type="text" id="cvc" v-model="cvc" placeholder="CVC" required>
  
          <button type="submit">Zapłać</button>
        </form>
      </div>
      <div v-if="paymentConfirmed">
        <p>Dziękujemy za dokonanie płatności!</p>
        <p>Twój samochód został zarezerwowany.</p>
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
      loadStripe('YOUR_STRIPE_PUBLIC_KEY').then((stripe) => {
        this.stripe = stripe;
      });
    },
    methods: {
      async processPayment() {
        try {
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
  
        } catch (err) {
          console.error('Błąd podczas przetwarzania płatności:', err);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styl dla komponentu Payments.vue */
  /* Możesz dostosować stylizację według własnych preferencji */
  form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  