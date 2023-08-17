import styled from "styled-components";
import { Background, MainColors, Status } from "../../../assets/theme/Colors";

export const Styles = styled.div`
  .Checkbox {
    &__Label {
      display: grid;
      grid-template-columns: 1em auto;
      gap: 0.5em;
      cursor: pointer;
      align-items: center;
    }

    &__Input {
      appearance: none;
      background-color: ${Background.bgLight};
      margin: 0;
      font: inherit;
      color: ${MainColors.primary};
      width: 1.15em;
      height: 1.15em;
      border: 0.15em solid ${MainColors.primary};
      border-radius: 0.15em;
      transform: translateY(-0.075em);
      display: grid;
      place-content: center;
      cursor: pointer;

      &:checked {
        &::before {
          transform: scale(1);
        }
      }

      &:disabled {
        color: ${Status.disabled};
        border-color: ${Status.disabled};
        opacity: 0.5;
        cursor: not-allowed;
      }

      &::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em ${MainColors.primary};
        transform-origin: bottom left;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      }
    }
  }
`;
