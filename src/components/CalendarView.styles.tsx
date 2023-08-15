import styled from "styled-components";

export const StyledContainer = styled.div`
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
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: red;
    padding: 0.2rem;
    border-radius: 0.3rem;
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

export const ModalContentContainer = styled.div``;
