<template>
    <input />
</template>


<style scoped>
input {
  padding: 0.7rem 1.5rem;
  text-align: left;
  border: none;
  border-radius: 18px;
  font-weight: 450;
  background-color: #c3c3c3; /* Cinzento mais escuro */
  color: #000000; /* Texto branco para contrastar */
  transition: all 0.3s ease-in;
  font-style: italic;
  opacity: 0.85;
  font-size: 1rem;
  width: 300px;
  max-width: 400px;
  box-shadow: 2px 2px 4px rgba(69, 69, 69, 0.7);
}

input::placeholder {
    font-size: 1rem;
    color: #3e3e3e;
    font-weight: 300;
}

input:focus {
  outline: none;
  border-color: var(--color-accent-dark); /* Um tom mais escuro para o foco */
}

input:disabled {
  background-color: var(--color-gray);
  color: var(--color-dark-gray);
  cursor: not-allowed;
}

@media screen and (max-width: 800px) {
  input {
    width: 200px
  }
}

@media screen and (max-height: 600px) {
  input {
    height: 30px;
  }
}

@media screen and (max-height: 350px) {
  input {
    height: 20px;
  }
}

@media screen and (max-width: 650px) {
  input {
    width: 150px
  }
}

</style>
