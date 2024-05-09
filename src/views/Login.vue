<template>
    <div id="Login-page">
      <h1 class="header">Logowanie</h1>
      
      <form v-if="!registerMode" @submit.prevent="login">
        <div class="form-group">
          <label for="username">Nazwa użytkownika:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Hasło:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Zaloguj się</button>
        <button type="button" @click="toggleRegisterMode">Załóż konto</button>
      </form>
  
      <form v-else @submit.prevent="register">
        <div class="form-group">
          <label for="newUsername">Nowa nazwa użytkownika:</label>
          <input type="text" id="newUsername" v-model="newUsername" required>
        </div>
        <div class="form-group">
          <label for="newPassword">Nowe hasło:</label>
          <input type="password" id="newPassword" v-model="newPassword" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Potwierdź hasło:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        </div>
        <button type="submit">Załóż konto</button>
        <button type="button" @click="toggleRegisterMode">Wróć do logowania</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: '',
        registerMode: false
      };
    },
    methods: {
      login() {
        // Tutaj możesz dodać logikę sprawdzania poprawności danych logowania
        // Symulujemy działanie sprawdzania danych logowania
        if (this.username === 'admin' && this.password === 'Password1!') {
          alert('Zalogowano pomyślnie!');
          // Tu możesz dodać przekierowanie do innej strony po zalogowaniu
        } else {
          alert('Błąd logowania. Sprawdź nazwę użytkownika i hasło.');
        }
      },
      register() {
        // Tutaj możesz dodać logikę rejestracji nowego konta
        // Symulujemy działanie rejestracji konta
        alert('Konto zostało założone pomyślnie!');
        // Tu możesz dodać przekierowanie do innej strony po założeniu konta
        // Następnie zapisz nowe konto w pliku Excel
      },
      toggleRegisterMode() {
        this.registerMode = !this.registerMode;
      }
    }
  };
  </script>
  
  <style>
  #Login-page {
    text-align: center;
    margin: 50px auto;
    max-width: 800px;
  }
  
  .header {
    color: #333;
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  input[type="text"],
  input[type="password"] {
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
    margin-right: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  