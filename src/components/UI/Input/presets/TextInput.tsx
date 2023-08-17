import { forwardRef } from "react";
import { Input, InputProps } from "../Input";

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", ...props }: InputProps, ref) => {
    return (
      <Input
        {...props}
        type={type}
        autoComplete="off"
        ref={ref}
        value={props.value}
        onChange={props.onChange}
      />
    );
  }
);

TextInput.displayName = "TextInput";
