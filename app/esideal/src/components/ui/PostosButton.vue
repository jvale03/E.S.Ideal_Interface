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
    opacity: 0.6;
    width: 220px;
    height: 100px;
    font-size: 1.1rem;
    margin: 30px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

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
      width: 150px;
      height: 70px;
      font-size: 0.8rem;
      margin: 10px
    }
  }
  @media screen and (max-width: 800px) {
    button {
      width: 150px;
      height: 70px;
      font-size: 0.8rem;
      margin: 10px
    }
  }

  @media screen and (max-height: 350px) {
    button {
      width: 70px;
      height: 30px;
      font-size: 0.5rem;
      margin: 10px
    }
  }

  </style>