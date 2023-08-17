import styled from "styled-components";

export const StyledContainer = styled.div<{ isDesktop: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;

  .LOGIN {
    &__Input {
      width: 100%;
      max-width: 250px;
      border-radius: 8px;
      border: 1px solid black;

      &-Select {
        width: 100%;
        max-width: 250px;
        border-radius: 8px;
      }

      &-Error {
        border-color: red;
      }
    }

    &__Buttons {
      width: 100%;
      display: flex;
      gap: 1.5rem;
      justify-content: center;
    }

    &__Button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
      font-weight: 500;
      width: 100%;
      margin-top: 2rem;
      max-width: 200px;

      background-color: white;
      color: blue;
      border: 1px solid blue;

      &:hover {
        background-color: darkblue;
        color: white;
      }
      &:focus {
        box-shadow: 0 0 0 2px black;
      }

      &--Delete {
        background-color: red;
        color: white;
        border: 1px solid red;

        &:hover {
          background-color: darkred;
        }
      }
    }
  }
`;
