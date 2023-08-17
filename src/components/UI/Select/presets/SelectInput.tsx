import { forwardRef } from "react";
import { SingleSelect, SingleSelectProps } from "../SingleSelect";
import styled from "styled-components";
import { GrayScale } from "../../../../assets/theme/Colors";

const StyledSelectInput = styled(SingleSelect)`
  .SelectInput {
    border-radius: 0.5rem;
    border: 1px solid ${GrayScale.FullDark};
    background-color: ${GrayScale.FullLight};
  }

  .SelectInput > fieldset {
    border: 0;
  }
`;

export const SelectInput = forwardRef<HTMLSelectElement, SingleSelectProps>(
  ({ ...props }: SingleSelectProps, ref) => {
    return (
      <StyledSelectInput
        selectProps={{ className: "SelectInput" }}
        {...props}
        ref={ref}
      />
    );
  }
);
SelectInput.displayName = "SelectInput";
