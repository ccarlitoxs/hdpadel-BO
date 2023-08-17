import styled from "styled-components";
import { MainColors, Status } from "../../../assets/theme/Colors";

export const Styles = styled.div<{ width?: string }>`
  display: inline-flex;
  flex-direction: column;
  width: ${(props) => props.width || "100%"};

  & .Label {
    font-size: 1.2rem;
    color: ${MainColors.primary};
  }

  & .Error {
    display: inline-block;
    color: ${Status.error};
    padding: 0.5rem 0;
    font-size: 1.2rem;
    word-wrap: break-word;
  }
`;

export const StyledSelect = styled.select`
  && {
    font-family: inherit;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.5;
    border-radius: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;
