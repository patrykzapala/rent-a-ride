<template>
	<main id="about-page" v-if="!reserveClicked">
		 <!-- Modal dla użytkowników niezalogowanych -->
		 <div class="modal" v-if="!isLoggedIn && showModal">
    <div class="modal-content modal-large">
      <p>Czy chcesz kontynuować bez logowania?</p>
      <div class="modal-buttons">
        <button class="btn-primary" @click="continueWithoutLogin">Kontynuuj bez logowania</button>
        <button class="btn-secondary" @click="hideModal">Powrót</button>
      </div>
    </div>
  </div>

  <!-- Modal dla zalogowanych użytkowników -->
  <div class="modal" v-else-if="isLoggedIn && showModal">
    <div class="modal-content modal-large">
      <p>Czy chcesz przejść do płatności?</p>
      <div class="modal-buttons">
        <button class="btn-primary" @click="goToPayment">Przejdź do płatności</button>
        <button class="btn-secondary" @click="hideModal">Powrót</button>
      </div>
    </div>
  </div>

	  <h1>Nasze samochody</h1>
	  <div v-if="!showForm" class="filter-options">
      <label for="fuelType">Wybierz rodzaj paliwa:</label>
      <select v-model="selectedFuelType" id="fuelType">
        <option value="">Dowolne</option>
        <option value="Benzyna">Benzyna</option>
        <option value="Diesel">Diesel</option>
        <option value="Elektryczny">Elektryczny</option>
        <option value="Hybrydowy">Hybrydowy</option>
      </select>

      <label for="capacity">Liczba osób :</label>
      <select v-model="selectedCapacity" id="capacity">
        <option value="">Dowolna</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6+">6+</option>
      </select>

      <label for="gearbox">Wybierz rodzaj skrzyni biegów:</label>
      <select v-model="selectedGearbox" id="gearbox">
        <option value="">Dowolna</option>
        <option value="Manualna">Manualna</option>
        <option value="Automatyczna">Automatyczna</option>
      </select>
	  <button @click="applyFilters">Filtruj</button>
	   <button @click="clearFilters">Wyczyść filtry</button>
    </div>
	  <div v-if="!showForm" class="car-container">
		<div v-if="cars.length === 0" class="no-cars-message">
        Brak samochodów spełniających kryteria.
      </div>
		<div class="car-card" v-for="(car, index) in cars" :key="index" @click="showCarForm(car)">
		  <img class="car-image" :src="car.image" :alt="car.name">
		  <h3>{{ car.name }}</h3>
		  <p> 
			<span class="material-icons">oil_barrel</span> {{ car.fuelType }}
			</p>
			<p> 
				<span class="material-icons">settings</span>{{ car.gearbox }}
			</p>
			<p> 
			<span class="material-icons">group_add</span> {{ car.capacity }}
			</p>
		</div>
	  </div>
	  <form v-else @submit.prevent="submitForm">
      <h2>Wynajmij {{ selectedCar.name }}</h2>
      <label for="startDate">Data Odbioru:</label>
      <input type="date" id="startDate" v-model="rentalData.startDate" required>

      <label for="endDate">Data Zwrotu:</label>
      <input type="date" id="endDate" v-model="rentalData.endDate" required>

	  <label for="startLocation">Miejsce Odbioru:</label>
		<select v-model="rentalData.startLocation" id="startLocation">
		<option value="Kraków">Kraków</option>
		<option value="Warszawa">Warszawa</option>
		<option value="Wrocław">Wrocław</option>
		</select>

		<label for="endLocation">Miejsce Zwrotu:</label>
		<select v-model="rentalData.endLocation" id="endLocation">
		<option value="Kraków">Kraków</option>
		<option value="Warszawa">Warszawa</option>
		<option value="Wrocław">Wrocław</option>
		</select>

	  <div class="button-wrapper">
        <button type="submit" @click="displayModal">Zarezerwuj</button>
        <button type="button" @click="goBack">Powrót</button>
      </div>
    </form>

	</main>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
		showModal: false,
		cars: [
		  { 
			name: 'Tesla Model S', 
			image: 'https://cdn.euroncap.com/media/72827/tesla-model-s.png',
			fuelType: 'Elektryczny',
			gearbox: 'Automatyczna',
			capacity: '5 osobowy' 
		  },		  
		  {	
			name: 'Hyundai IONIQ 6', 
			image: 'https://cdn.euroncap.com/media/72823/hyundai-ioniq-6.png?mode=crop&width=688&height=457',
			fuelType: 'Elektryczny',
			gearbox: 'Automatyczna',
			capacity: '4 osobowy' 
		  },
		  { 
			name: 'Nissan Quashqai', 
			image: 'https://cdn.euroncap.com/media/66922/nissan-qashqai.png?mode=crop&width=688&height=457',
			fuelType: 'Hybrydowy',
			gearbox: 'Manualna',
			capacity: '5 osobowy'  
		  },
		  { 
			name: 'Skoda Fabia', 
			image: 'https://cdn.euroncap.com/media/65733/skoda-fabia.png?mode=crop&width=688&height=457',
			fuelType: 'Benzyna',
			gearbox: 'Automatyczna',
			capacity: '5 osobowy'  
		},
		  { 
			name: 'Tesla Model Y', 
			image: 'https://cdn.euroncap.com/media/70303/tesla-model-y.png?mode=crop&width=688&height=457',
			fuelType: 'Elektryczny',
			gearbox: 'Automatyczna',
			capacity: '4 osobowy' 
		},
		  { 
			name: 'Peugeot Partner', 
			image: 'https://euroncap.blob.core.windows.net/media/80275/peugeot-partner.png',
			fuelType: 'Hybrydowy',
			gearbox: 'Manualna',
			capacity: '7 osobowy'  
		},
		  { 
			name: 'Fiat Ducato', 
			image: 'https://euroncap.blob.core.windows.net/media/67741/fiat-ducato.png',
			fuelType: 'Diesel',
			gearbox: 'Manualna',
			capacity: '9 osobowy'  
		},
		  { 
			name: 'BMW 5 Series', 
			image: 'https://cdn.euroncap.com/media/78833/bmw-5-series.png?mode=crop&width=359&height=235',
			fuelType: 'Benzyna',
			gearbox: 'Automatyczna',
			capacity: '5 osobowy'  
		},
		  { 
			name: 'Jeep Renegade', 
			image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png',
			fuelType: 'Diesel',
			gearbox: 'Manualna',
			capacity: '4 osobowy' 
		 }

		],
		originalCars: [
		  { 
			name: 'Tesla Model S', 
			image: 'https://cdn.euroncap.com/media/72827/tesla-model-s.png',
			fuelType: 'Elektryczny',
			gearbox: 'Automatyczna',
			capacity: '5 osobowy' 
		  },		  
		  {	
			name: 'Hyundai IONIQ 6', 
			image: 'https://cdn.euroncap.com/media/72823/hyundai-ioniq-6.png?mode=crop&width=688&height=457',
			fuelType: 'Elektryczny',
			gearbox: 'Automatyczna',
			capacity: '4 osobowy' 
		  },
		  { 
			name: 'Nissan Quashqai', 
			image: 'https://cdn.euroncap.com/media/66922/nissan-qashqai.png?mode=crop&width=688&height=457',
			fuelType: 'Hybrydowy',
			gearbox: 'Manualna',
			capacity: '5 osobowy'  
		  },
		  { 
			name: 'Skoda Fabia', 
			image: 'https://cdn.euroncap.com/media/65733/skoda-fabia.png?mode=crop&width=688&height=457',
			fuelType: 'Benzyna',
			gearbox: 'Automatyczna',
			capacity: '5 osobowy'  
		},
		  { 
			name: 'Tesla Model Y', 
			image: 'https://cdn.euroncap.com/media/70303/tesla-model-y.png?mode=crop&width=688&height=457',
			fuelType: 'Elektryczny',
			gearbox: 'Automatyczna',
			capacity: '4 osobowy' 
		},
		  { 
			name: 'Peugeot Partner', 
			image: 'https://euroncap.blob.core.windows.net/media/80275/peugeot-partner.png',
			fuelType: 'Hybrydowy',
			gearbox: 'Manualna',
			capacity: '7 osobowy'  
		},
		  { 
			name: 'Fiat Ducato', 
			image: 'https://euroncap.blob.core.windows.net/media/67741/fiat-ducato.png',
			fuelType: 'Diesel',
			gearbox: 'Manualna',
			capacity: '9 osobowy'  
		},
		  { 
			name: 'BMW 5 Series', 
			image: 'https://cdn.euroncap.com/media/78833/bmw-5-series.png?mode=crop&width=359&height=235',
			fuelType: 'Benzyna',
			gearbox: 'Automatyczna',
			capacity: '5 osobowy'  
		},
		  { 
			name: 'Jeep Renegade', 
			image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png',
			fuelType: 'Diesel',
			gearbox: 'Manualna',
			capacity: '4 osobowy' 
		 }

		],    
		selectedFuelType: '',
      	selectedCapacity: '',
      	selectedGearbox: '',
		showForm: false,
		selectedCar: null,
		rentalData: {
		  startDate: '',
		  endDate: '',
		  startLocation: 'Kraków',
		  endLocation: 'Kraków'
		}
	  };
	},
	methods: {
	  showCarForm(car) {
		this.showForm = true;
		this.selectedCar = car;	
	  },
	  submitForm() {
		if (this.rentalData.startDate && this.rentalData.endDate && this.rentalData.endDate < this.rentalData.startDate) {
    alert("Data zwrotu nie może być wcześniejsza niż data odbioru.");
    return; 
  }
		console.log("Form submitted with data:", this.rentalData);
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
    },
	applyFilters() {

  const carsToFilter = [...this.originalCars];

  const filteredCars = carsToFilter.filter(car => {
    let passFilter = true;

    if (this.selectedFuelType && car.fuelType !== this.selectedFuelType) {
      passFilter = false;
    }

    if (this.selectedCapacity) {
      if (this.selectedCapacity === '6+') {
        if (parseInt(car.capacity) < 6) {
          passFilter = false;
        }
      } else {
        if (parseInt(car.capacity) !== parseInt(this.selectedCapacity)) {
          passFilter = false;
        }
      }
    }

    if (this.selectedGearbox && car.gearbox !== this.selectedGearbox) {
      passFilter = false;
    }

    return passFilter;
  });

  this.cars = filteredCars;
},
clearFilters() {
      this.selectedFuelType = '';
      this.selectedCapacity = '';
      this.selectedGearbox = '';
      
      this.cars = [...this.originalCars];
    },
	 displayModal() {
      this.showModal = true;
    },

    hideModal() {
      this.showModal = false;
    },

    continueWithoutLogin() {
	  this.$router.push('/payments');
      this.hideModal();
    },

    goToPayment() {
	  this.$router.push('/payments');
      this.hideModal();
    },

	  reserveButtonClicked() {
      this.reserveClicked = true;
	  this.displayModal(); 
    },
    closeModal() {
      this.reserveClicked = false; 
    }

  }
};
  </script>
  
  
  <style scoped>

#about-page {
  padding: 20px;
}

.filter-options {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.filter-options label {
  font-weight: bold;
}

.filter-options select {
  padding: 8px;
}

.filter-options button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-options button:hover {
  background-color: #0056b3;
}

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
  cursor: pointer; 
}

.car-image {
  max-width: 100%;
  height: auto;
}

.no-cars-message {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
}

form {
  margin-top: 20px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  width: calc(30% - 10px); 
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form select {
  padding: 8px; 
  font-size: 16px; 
}

form button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button[type="submit"] {
  margin-right: 10px;
}

form button[type="submit"]:hover,
form button[type="button"]:hover {
  background-color: #0056b3;
}


.modal-content.modal-large {
  width: 60%; 
  margin: 10% auto; 
}


.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  margin: 0 10px; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff; 
  color: #fff;
}

.btn-secondary {
  background-color: #ccc; 
  color: #000;
}
</style>