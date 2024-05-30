<template>
    <div class="title">
      <div @click="$router.push('/postos/')">{{ title }}</div>
      <h2>{{ subtitle }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .title {
    font-size: 6rem;
    font-weight: 800;
    font-style: italic;
    justify-content: center;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .title h2 {
    font-size: 1.6rem;
    font-weight: 600;
    font-style: italic;
    text-align: center;
    justify-content: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .title div:hover {
    opacity: 0.7;
  }

  @media screen and (max-height: 450px) {
    .title {
      display: none; /* Esconde o elemento quando a altura da janela for igual ou inferior a 400px */
    }
  }

  @media screen and (max-height: 600px) {
    .title h2 {
      display: none; /* Esconde o elemento quando a altura da janela for igual ou inferior a 400px */
    }
  }

  </style>
  