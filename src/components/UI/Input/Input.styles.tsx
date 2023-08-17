import styled from 'styled-components';
import {GrayScale, MainColors, Status} from '../../../assets/theme/Colors';

export const Styles = styled.div`
  color: ${GrayScale.darkOverLight};

  & .Container {
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    & .Label {
      font-size: 1.2rem;
      color: ${MainColors.primary};
      margin-bottom: 0.5rem;
    }

    & .Input {
      border: none;
      outline: none;
      padding: 1rem 1.5rem;
      line-height: 1.6rem;
      font-size: 1.4rem;
      font-family: inherit;
      /* border: 1px solid ${MainColors.primary}; */
      border-radius: 3rem;

      &:focus-within {
        border-color: ${MainColors.primary};
      }

      &::placeholder {
        font-family: inherit;
      }
    }

    & .TextArea {
      line-height: 2rem;
      resize: vertical;
    }
  }

  & .Error {
    display: inline-block;
    color: ${Status.error};
    padding: 0.5rem 0;
    font-size: 1.2rem;
    word-wrap: break-word;
  }
`;
