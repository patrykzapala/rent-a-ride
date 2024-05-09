<template>
    <div id="Contact-page">
      <h1 class="header">Kontakt</h1>
      
      <div class="contact-info">
        <p>Adres: ul. Przykładowa 123, 00-000 Kraków</p>
        <p>Telefon: +48 123 456 789</p>
        <p>Email: info@rent-a-ride.com</p>
      </div>
  
      <h2 class="sub-header">Skontaktuj się z nami</h2>
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="name">Imię i nazwisko:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="email">Adres e-mail:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="message">Wiadomość:</label>
          <textarea id="message" v-model="message" required></textarea>
        </div>
        <button type="submit">Wyślij</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: ''
      };
    },
    methods: {
      sendEmail() {
        // Tutaj możesz dodać logikę wysyłania emaila, np. przy użyciu jakiejś usługi API
        console.log('Dane do wysłania emaila:', this.name, this.email, this.message);
        
        // Czyść formularz po wysłaniu
        this.name = '';
        this.email = '';
        this.message = '';
  
        // Poinformuj użytkownika o wysłaniu emaila (możesz dodać odpowiednią wiadomość)
        alert('Twoja wiadomość została wysłana!');
      }
    }
  };
  </script>
  
  <style>
  #Contact-page {
    text-align: center;
    margin: 50px auto;
    max-width: 800px;
  }
  
  .header {
    color: #333;
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .sub-header {
    color: #666;
    font-size: 24px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  
  .contact-info {
    margin-bottom: 40px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  