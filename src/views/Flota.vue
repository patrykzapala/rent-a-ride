<template>
	<main id="about-page">
	  <h1>Nasze samochody</h1>
	  <div class="filter-options">
      <label for="fuelType">Wybierz rodzaj paliwa:</label>
      <select v-model="selectedFuelType" id="fuelType">
        <option value="">Dowolne</option>
        <option value="Benzyna">Benzyna</option>
        <option value="Diesel">Diesel</option>
        <option value="Elektryczny">Elektryczny</option>
        <option value="Hybrydowy">Hybrydowy</option>
      </select>

      <label for="capacity">Wybierz pojemność:</label>
      <select v-model="selectedCapacity" id="capacity">
        <option value="">Dowolne</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="5+">5+</option>
      </select>

      <label for="gearbox">Wybierz rodzaj skrzyni biegów:</label>
      <select v-model="selectedGearbox" id="gearbox">
        <option value="">Dowolne</option>
        <option value="Manualna">Manualna</option>
        <option value="Automatyczna">Automatyczna</option>
      </select>
	  <button @click="applyFilters">Filtruj</button>
    </div>
	  <div v-if="!showForm" class="car-container">
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
    },
	applyFilters() {
  // Create a copy of the original cars array to filter from
  const carsToFilter = [...this.originalCars];

  // Filter cars based on selected filter options
  const filteredCars = carsToFilter.filter(car => {
    let passFilter = true;

    // Filter by fuel type
    if (this.selectedFuelType && car.fuelType !== this.selectedFuelType) {
      passFilter = false;
    }

    // Filter by capacity
    if (this.selectedCapacity) {
      if (this.selectedCapacity === '5+') {
        // Filter for capacity 5 and above
        if (parseInt(car.capacity) < 5) {
          passFilter = false;
        }
      } else {
        // Filter for exact capacity
        if (car.capacity !== this.selectedCapacity) {
          passFilter = false;
        }
      }
    }

    // Filter by gearbox
    if (this.selectedGearbox && car.gearbox !== this.selectedGearbox) {
      passFilter = false;
    }

    return passFilter;
  });

  // Update cars with filtered results
  this.cars = filteredCars;
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