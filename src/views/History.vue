<template>
	<div id="About-page">
	  <h1 class="header">O nas</h1>
	  
	  <div class="about-text">
		<p>
		  Witaj w Rent-a-Ride - miejscu, które sprawi, że Twoje podróże staną się niezapomniane! Jesteśmy wypożyczalnią samochodów, która nie tylko oferuje szeroki wybór pojazdów, ale także dba o każdy detal Twojej podróży.
		</p>
		<p>
		  Nasza pasja do motoryzacji i zaangażowanie w zapewnienie najlepszych doświadczeń podróżniczych sprawia, że możesz mieć pewność, że z nami Twoja podróż będzie nie tylko bezpieczna, ale również wygodna i pełna przygód.
		</p>
		<p>
		  Niezależnie od tego, czy planujesz rodzinny wypad za miasto, romantyczną podróż we dwoje, czy też podróż służbową, nasza różnorodna flota pojazdów zaspokoi Twoje potrzeby. Od eleganckich limuzyn po dynamiczne SUV-y - mamy wszystko, czego potrzebujesz, aby podróżować z komfortem i stylem.
		</p>
		<p>
		  Przekonaj się sam! Zarezerwuj już dziś i dołącz do grona zadowolonych podróżników, którzy wybierają Rent-a-Ride jako swojego partnera w podróży.
		</p>
		<!-- Wyświetl zamówienie, jeśli istnieje -->
		<div v-if="order" class="order-details">
			<h2>Twoje ostatnie zamówienie:</h2>
			<p>Numer karty: {{ order.cardNumber }}</p>
			<p>Data ważności: {{ order.expiryDate }}</p>
			<p>CVC: {{ order.cvc }}</p>
			<!-- Dodaj więcej informacji o zamówieniu, jeśli istnieją -->
		</div>
	  </div>
  
	 
	</div>
  </template>
  
  <style>
  #About-page {
	position: relative; /* Konieczne do poprawnego pozycjonowania samochodu */
	text-align: center;
	margin: 50px auto;
	max-width: 800px;
  }
  
  .header {
	color: #333;
	font-size: 36px;
	margin-bottom: 20px;
  }
  
  .about-text {
	color: #666;
	font-size: 18px;
	line-height: 1.6;
  }
  
  .about-text p {
	margin-bottom: 20px;
  }
  
  .car {
	position: absolute;
	top: -50px; /* Początkowa pozycja na górze strony */
	left: 50%; /* Centralne ustawienie na stronie */
	transform: translateX(-50%); /* Poprawia centralne ustawienie */
	font-size: 40px; /* Rozmiar ikony samochodu */
	color: #ffcc00; /* Kolor samochodu */
	animation: moveCar 10s linear infinite; /* Uruchamia animację */
  }
  
  @keyframes moveCar {
	0% { left: -100px; } /* Początkowa pozycja poza lewym marginesem */
	100% { left: calc(100% + 100px); } /* Przesunięcie poza prawy margines */
  }
  </style>
  
  <script>
  export default {
	mounted() {
	  // Kod JavaScript można dodać tutaj, jeśli potrzebujesz logiki dla komponentu
	}
  }
  </script>
  