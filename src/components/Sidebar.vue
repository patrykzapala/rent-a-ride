<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
	  <div class="logo">
		<img :src="logoURL" alt="Vue" />
	  </div>
  
	  <div class="menu-toggle-wrap">
		<button class="menu-toggle" @click="ToggleMenu">
		  <span class="material-icons">{{ is_expanded ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right' }}</span>
		</button>
	  </div>
  
	  <h3>Menu</h3>
	  <div class="menu">
		<router-link to="/" class="button">
		  <span class="material-icons">home</span>
		  <span class="text">O nas</span>
		</router-link>
		<router-link to="/flota" class="button">
		  <span class="material-icons">car_rental</span>
		  <span class="text">Flota</span>
		</router-link>
		<router-link to="/opinions" class="button">
		  <span class="material-icons">thumb_up</span>
		  <span class="text">Opinie</span>
		</router-link>
		<router-link to="/contact" class="button">
		  <span class="material-icons">email</span>
		  <span class="text">Kontakt</span>
		</router-link>
		<router-link v-if="isLoggedIn" to="/history" class="button">
 		 <span class="material-icons">history</span>
  		 <span class="text">Historia zamówień</span>
		</router-link>

	  </div>
  
	  <div class="flex"></div>
  
	  <div class="menu">
		<template v-if="!isLoggedIn">
		  <form @submit.prevent="login">
			<div class="form-group">
			  <label for="username">Nazwa użytkownika:</label>
			  <input type="text" id="username" v-model="username">
			</div>
			<div class="form-group">
			  <label for="password">Hasło:</label>
			  <input type="password" id="password" v-model="password">
			  <p v-if="loginError" class="error-message">Nieprawidłowa nazwa użytkownika lub hasło.</p>
			</div>
			<button type="submit" class="button">Zaloguj</button>
			<button @click="showRegisterForm = true; showLoginForm = false" class="button">Dodaj konto</button>

		  </form>
		</template>
		<template v-else>
		  <button @click="logout" class="button">
			<span class="material-icons">logout</span>
			<span class="text">Wyloguj</span>
		  </button>
		</template>
	  </div>
  
	  <!-- Formularz rejestracji -->
	  <div v-if="showRegisterForm" class="menu">
		<form @submit.prevent="register">
		  <div class="form-group">
			<label for="newUsername">Nowa nazwa użytkownika:</label>
			<input type="text" id="newUsername" v-model="newUsername">
		  </div>
		  <div class="form-group">
			<label for="newPassword">Nowe hasło:</label>
			<input type="password" id="newPassword" v-model="newPassword">
		  </div>
		  <button type="submit" class="button">Zarejestruj</button>
		</form>
	  </div>
	</aside>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import logoURL from '../assets/logo.png';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const storedUser = localStorage.getItem('user');
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const username = ref(storedUser ? JSON.parse(storedUser).username : '');
  const password = ref('');
  const isLoggedIn = ref(storedIsLoggedIn);
  const showLoginForm = ref('');
  const newUsername = ref('');
  const newPassword = ref('');
  const showRegisterForm = ref(false);
  
  const loginError = ref(false);

const login = () => {
	const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username.value && u.password === password.value);
  if (user) {
    isLoggedIn.value = true;
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('user', JSON.stringify({ username: username.value }));
    showLoginForm.value = false; // Ustawienie wartości na false, aby ukryć formularz logowania
    showRegisterForm.value = false; // Upewnienie się, że formularz rejestracji jest również ukryty
	loginError.value = false; // resetujemy wartość błędu po udanym zalogowaniu
} else {
      loginError.value = true; // ustawiamy wartość na true, jeśli logowanie nie powiodło się
    }
};
  
  const logout = () => {
	isLoggedIn.value = false;
	localStorage.setItem('isLoggedIn', false);
	localStorage.removeItem('user');
	router.push('/');
  };
  
  const register = () => {
	if (newUsername.value && newPassword.value) {
	  const newUser = {
		username: newUsername.value,
		password: newPassword.value
	  };
	  localStorage.setItem('users', JSON.stringify([...JSON.parse(localStorage.getItem('users') || '[]'), newUser]));
	  isLoggedIn.value = true;
	  username.value = newUsername.value;
	  password.value = newPassword.value;
	  showRegisterForm.value = false;
	  console.log("Registered successfully. showRegisterForm:", showRegisterForm.value);
	}
  };
  
  const is_expanded = ref(localStorage.getItem('is_expanded') === 'true');
  
  const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value;
	localStorage.setItem('is_expanded', is_expanded.value);
  };
  </script>
  
  <style scoped>
  aside {
	display: flex;
	flex-direction: column;
	background-color: #564e10d3;
	color: var(--light);
	width: 200px;
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;
	transition: width 0.2s ease-in-out;
  }
  
  .logo {
	margin-bottom: 1rem;
  }
  
  .logo img {
	width: 10rem;
  }
  
  .menu-toggle-wrap {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 1rem;
	position: relative;
	top: 0;
	transition: 0.2s ease-in-out;

  }
  
  .menu-toggle-wrap .menu-toggle {
	transition: 0.2s ease-in-out;
  }
  
  .menu-toggle-wrap .menu-toggle .material-icons {
	font-size: 2rem;
	color: black;
	transition: 0.2s ease-out;
  }
  
  .menu-toggle-wrap .menu-toggle:hover .material-icons {
	color: var(--primary);
	transform: translateX(0.5rem);
  }
  
  h3,
  .button .text {
	opacity: 1;
	transition: opacity 0.3s ease-in-out;
  }
  
  h3 {
	color: black;
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
	text-transform: uppercase;
  }
  
  .menu {
	margin: 0 -1rem;
  }
  
  .button {
	display: flex;
	align-items: center;
	text-decoration: none;
	transition: 0.2s ease-in-out;
	padding: 0.5rem 1rem;
  }
  
  .button:hover {
	background-color: lightblue;
  }
  
  .button .material-icons,
  .button .text {
	color: var(--light);
	transition: 0.2s ease-in-out;
  }
  
  .flex {
	flex: 1;
  }
  
  .form-group {
	margin-bottom: 1rem;
  }
  
  input[type="text"],
  input[type="password"] {
	width: 100%;
	padding: 0.5rem;
	font-size: 1rem;
	border: 1px solid #ccc;
	border-radius: 0.25rem;
  }
  
  button {
	background-color: var(--primary);
	color: var(--light);
	padding: 0.5rem 1rem;
	font-size: 1rem;
	border: none;
	border-radius: 0.25rem;
	cursor: pointer;
	margin-right: 0.5rem;
  }
  
  button:hover {
	background-color: var(--primary-alt);
  }
  
  /* Styl dla zwiniętego menu */
  aside.is-expanded {
	width: 250px; /* Domyślna szerokość dla rozciągniętego menu */
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  </style>
  