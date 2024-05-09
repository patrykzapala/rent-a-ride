<template>
    <div class="opinions">
      <h2>Opinie</h2>
      <div class="opinions-list">
        <div v-for="(opinion, index) in opinions" :key="index" class="opinion">
          <div class="opinion-rating">
            <span v-for="star in opinion.rating" :key="star" class="star">⭐</span>
          </div>
          <div class="opinion-content">{{ opinion.content }}</div>
        </div>
      </div>
      <div class="add-opinion">
        <h3>Dodaj nową opinię</h3>
        <label for="rating">Ocena:</label>
        <select v-model="newOpinionRating" id="rating">
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <textarea v-model="newOpinionContent" placeholder="Wpisz swoją opinię"></textarea>
        <button @click="addOpinion">Dodaj opinię</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        opinions: [
          {
            rating: 5,
            content: "Bardzo polecam tę aplikację! Bardzo łatwa w obsłudze i świetnie się prezentuje."
          },
          {
            rating: 4,
            content: "Super funkcjonalność! Szybko znajduję to, czego potrzebuję."
          },
          // Dodaj więcej opinii według potrzeb
        ],
        newOpinionRating: 5,
        newOpinionContent: ''
      };
    },
    methods: {
      addOpinion() {
        if (this.newOpinionContent.trim() !== '') {
          this.opinions.push({
            rating: parseInt(this.newOpinionRating),
            content: this.newOpinionContent.trim()
          });
          this.newOpinionRating = 5; // Resetujemy wartość wyboru oceny
          this.newOpinionContent = ''; // Wyczyszczenie pola po dodaniu opinii
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Style zostały zachowane z poprzedniej wersji */
  
  .opinions {
    text-align: center;
  }
  
  .opinions h2 {
    font-size: 30px;
    margin-bottom: 30px;
  }
  
  .opinions-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .opinion {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    width: 95%;
    max-width: 800px; /* Zwiększyłem maksymalną szerokość opinii */
    text-align: center; /* Wyrównanie tekstu do lewej strony */
  }
  
  .opinion-rating {
    margin-bottom: 10px;
  }
  
  .star {
    color: gold;
    font-size: 24px;
  }
  
  .opinion-content {
    font-size: 20px;
  }
  
  .add-opinion {
    margin-top: 50px;
  }
  
  .add-opinion h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .add-opinion textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .add-opinion select {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .add-opinion button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-opinion button:hover {
    background-color: #0056b3;
  }
  </style>
  