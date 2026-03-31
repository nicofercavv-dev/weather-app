import styled from "styled-components";

export const FormStyled = styled.form`
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    width: fit-content;
  }

  input,
  select {
    outline: none;
    border: 2px solid transparent;
    transition: all 0.3s ease-in-out;

    &:focus {
      border-color: #a389d4;
      box-shadow: 0 0 8px rgba(163, 137, 212, 0.6);
    }

    &:focus-visible {
      outline: none;
      border-color: #fff;
      box-shadow:
        0 0 0 2px #4b2c82,
        0 0 0 4px #a389d4;
    }
  }

  input {
    height: 3.5625rem;
    background-image: linear-gradient(#957dcd, #523d7f);
    border-radius: 0.9375rem;
    color: #ffffff;
    font-size: 1.25rem;
    padding: 0 1.5rem;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-clear-button {
    display: none;
    -webkit-appearance: none;
  }

  .small-input {
    width: 9.375rem;
  }

  .error-span {
    color: red;
    font-size: 1.125rem;
  }

  select {
    height: 3.5625rem;
    background-image: linear-gradient(#957dcd, #523d7f);
    border: none;
    border-radius: 0.9375rem;
    color: #ffffff;
    font-size: 1.25rem;
    padding: 0 1.5rem;

    option {
      color: #FFFFFF;
      background-color: #4b2c82;
    }
  }

  fieldset {
    padding: 0;
    display: grid;
    border: none;
    width: 100%;
  }

  .fieldset-cidade-data {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    min-height: 9.375rem;
  }

  .fieldset-valores {
    grid-template-columns: repeat(12, 1fr);
    justify-items: center;
    min-height: 24.75rem;
    background-image: linear-gradient(#957dcd4a, #523d7f80);
    border-radius: 0.9375rem;
    box-sizing: border-box;
    padding: 4.375rem 0 3.125rem 0;
    row-gap: 2.5rem;
  }

  .input-linha-1 {
    grid-column: span 3;
  }

  .input-linha-2 {
    grid-column: span 4;
  }

  .actions {
    float: right;
    margin-top: 3.125rem;

    button {
      height: 3.625rem;
      width: 17.125rem;
      background-image: linear-gradient(#957dcd, #523d7f);
      border: none;
      border-radius: 6.25rem;
      font-size: 1.5rem;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }

    .cancelar {
      margin-right: 2.125rem;
    }
  }
`;
