import { forwardRef } from "react";
import { SingleSelect, SingleSelectProps } from "../SingleSelect";
import styled from "styled-components";
import { GrayScale } from "../../../../assets/theme/Colors";

const StyledSelectInput = styled(SingleSelect)`
  .SelectInput {
    border-radius: 3rem;
    background-color: ${GrayScale.FullLight};

    & .MuiSelect-select {
      padding: 0.5rem 2rem;
    }
  }

  .SelectInput > fieldset {
    border: 0;
  }
`;

export const SelectInputRounded = forwardRef<
  HTMLSelectElement,
  SingleSelectProps
>(({ ...props }: SingleSelectProps, ref) => {
  return (
    <StyledSelectInput
      selectProps={{ className: "SelectInput" }}
      {...props}
      ref={ref}
    />
  );
});
SelectInputRounded.displayName = "SelectInput";
