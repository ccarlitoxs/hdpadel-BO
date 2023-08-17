import styled from "styled-components";

export const StyledContainer = styled.div<{ isDesktop: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  width: 100%;

  .HEADER {
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .HEADER__Title {
      font-size: 2.4rem;
    }

    .HEADER__Button {
      padding: 0.7rem 1.2rem;
      font-size: 1.2rem;
    }
  }

  .eventContent {
    display: flex;
    flex-direction: ${({ isDesktop }) => (isDesktop ? "row" : "column")};
    gap: 0.5rem;
    width: 100%;
    height: 100%;
    background-color: gray;
    padding: 0.2rem;
    border-radius: 0.3rem;
    overflow-y: auto;

    p {
      margin: 0;
    }
  }

  .fc {
    height: calc(100vh - 130px);
  }

  .fc-toolbar-title {
    font-size: 1.6rem;
  }

  .fc .fc-button {
    border-radius: 0.25rem;
    padding: 0.4rem 0.65rem;
    font-size: 1rem;
  }

  .fc-v-event {
    border: none;
    background-color: transparent;
  }
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 1.5rem;

  .MODAL {
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

    &__Checkboxes {
      display: flex;
      gap: 2rem;
    }
  }

  .react-datepicker__time {
    font-size: 1.3rem;
  }
`;
