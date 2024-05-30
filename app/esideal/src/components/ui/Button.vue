<template>
  <button type="button">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
  outline: none;
  border: 1px solid var(--color-accent);
  border-radius: 15px;
  font-weight: 600;
  background-color: var(--color-accent);
  color: var(--color-light);
  transition: all 0.3s ease-in;
  text-align: center;
  opacity: 0.6;
  line-height: 0px;

  width: 120px; /* Largura fixa */
  height: 35px; /* Altura fixa */
}

button:hover {
  opacity: 1;
}

button:disabled,
button:disabled:hover {
  background-color: var(--color-accent);
  color: var(--color-light);
  opacity: 0.5;
  cursor: not-allowed;

}

@media screen and (max-height: 600px) {
  button {
    height: 25px;
    font-size: 0.6rem;
  }
}

@media screen and (max-height: 350px) {
  button {
    height: 20px;
    font-size: 0.5rem;
    font-weight: 400;
  }
}

</style>