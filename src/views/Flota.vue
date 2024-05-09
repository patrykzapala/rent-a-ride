<template>
	<main id="about-page">
	  <h1>Nasze samochody</h1>
	  <div v-if="!showForm" class="car-container">
		<div class="car-card" v-for="(car, index) in cars" :key="index" @click="showCarForm(car)">
		  <img class="car-image" :src="car.image" :alt="car.name">
		  <h3>{{ car.name }}</h3>
		</div>
	  </div>
	  <form v-else @submit.prevent="submitForm">
      <h2>Wynajmij {{ selectedCar.name }}</h2>
      <label for="startDate">Data Odbioru:</label>
      <input type="date" id="startDate" v-model="rentalData.startDate" required>
      
      <label for="endDate">Data Zwrotu:</label>
      <input type="date" id="endDate" v-model="rentalData.endDate" required>
      
      <label for="startLocation">Miejsce Odbioru:</label>
      <input type="text" id="startLocation" v-model="rentalData.startLocation" required>
      
      <label for="endLocation">Miejsce Zwrotu:</label>
      <input type="text" id="endLocation" v-model="rentalData.endLocation" required>
      
      <button type="submit">Sprawdz</button>

	  <button type="button" @click="goBack">Powrót</button>
    </form>
	</main>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		cars: [
		  { name: 'Tesla Model S', image: 'https://cdn.euroncap.com/media/72827/tesla-model-s.png' },		  
		  { name: 'Hyundai IONIQ 6', image: 'https://cdn.euroncap.com/media/72823/hyundai-ioniq-6.png?mode=crop&width=688&height=457' },
		  { name: 'Nissan Quashqai', image: 'https://cdn.euroncap.com/media/66922/nissan-qashqai.png?mode=crop&width=688&height=457' },
		  { name: 'Skoda Fabia', image: 'https://cdn.euroncap.com/media/65733/skoda-fabia.png?mode=crop&width=688&height=457' },
		  { name: 'Tesla Model Y', image: 'https://cdn.euroncap.com/media/70303/tesla-model-y.png?mode=crop&width=688&height=457' },
		  { name: 'Peugeot Partner', image: 'https://euroncap.blob.core.windows.net/media/80275/peugeot-partner.png' },
		  { name: 'Fiat Ducato', image: 'https://euroncap.blob.core.windows.net/media/67741/fiat-ducato.png' },
		  { name: 'BMW 5 Series', image: 'https://cdn.euroncap.com/media/78833/bmw-5-series.png?mode=crop&width=359&height=235' },
		  { name: 'Jeep Renegade', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' }
		],
		showForm: false,
		selectedCar: null,
		rentalData: {
		  startDate: '',
		  endDate: '',
		  startLocation: '',
		  endLocation: ''
		}
	  };
	},
	methods: {
	  showCarForm(car) {
		this.showForm = true;
		this.selectedCar = car;
	  },
	  submitForm() {
		// Handle form submission here
		console.log("Form submitted with data:", this.rentalData);
		// Reset form state after submission
		this.showForm = false;
		this.selectedCar = null;
		this.rentalData = {
		  startDate: '',
		  endDate: '',
		  startLocation: '',
		  endLocation: ''
		};
	  },
	  goBack() {
      this.showForm = false;
      this.selectedCar = null;
      this.rentalData = {
        startDate: '',
        endDate: '',
        startLocation: '',
        endLocation: ''
      };
    }
  }
};
  </script>
  
  
  <style scoped>
	.car-container {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: center;
	}
	.car-card {
	  width: 30%;
	  margin: 1rem;
	  padding: 1rem;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	  text-align: center;
	  cursor: pointer; /* Add cursor pointer to indicate clickable */
	}
	.car-image {
	  max-width: 100%;
	  height: auto;
	}
  </style>