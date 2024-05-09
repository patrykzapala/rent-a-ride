<template>
	<main id="about-page">
		<h1>Aboutttt</h1>
		<div class="car-container">
          <div class="car-card" v-for="(car, index) in cars" :key="index">
            <img class="car-image" :src="car.image" :alt="car.name">
            <h3>{{ car.name }}</h3>
          </div>
  		</div>
	</main>
</template>

<script>
export default {
  data() {
    return {
      cars: [
        { name: 'Car 1', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' },
        { name: 'Car 2', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' },
        { name: 'Car 3', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' },
        { name: 'Car 4', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' },
        { name: 'Car 5', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' },
        { name: 'Car 6', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' },
        { name: 'Car 7', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' },
        { name: 'Car 8', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' },
        { name: 'Car 9', image: 'https://cdn.euroncap.com/media/56661/jeep-renegade.png' }
      ]
    };
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
  }
  .car-image {
    max-width: 100%;
    height: auto;
  }
</style>