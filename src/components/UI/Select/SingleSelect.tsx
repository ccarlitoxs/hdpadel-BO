import {
  ChangeEventHandler,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { StyledSelect, Styles } from "./SingleSelect.styles";

export interface SingleSelectOption {
  value: string;
  label: string;
}

export interface SingleSelectProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  label?: string | ReactNode;
  error?: string | ReactNode;
  id?: string;
  value?: string;
  width?: string;
  options: SingleSelectOption[];
  onChangeValue?: (newValue: string) => void;
  selectProps?: HTMLAttributes<HTMLSelectElement>;
  name?: string;
}

export const SingleSelect = forwardRef<HTMLSelectElement, SingleSelectProps>(
  (
    {
      placeholder,
      label,
      id,
      error,
      value,
      options,
      onChangeValue,
      selectProps,
      width,
      name,
      ...props
    }: SingleSelectProps,
    ref
  ) => {
    const changeValueHandler: ChangeEventHandler<HTMLSelectElement> = (
      event
    ) => {
      const newValue = event.target.value as string;
      onChangeValue?.(newValue);
    };

    const FormattedLabel = getFormattedLabel(label, id);
    const FormattedError = getFormattedError(error);
    const formattedOptions = placeholder
      ? [{ value: "", label: placeholder }].concat(options)
      : [...options];

    return (
      <Styles {...props} width={width}>
        {FormattedLabel}
        <StyledSelect
          {...selectProps}
          value={value}
          onChange={changeValueHandler}
          ref={ref}
          name={name}
        >
          {formattedOptions.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </StyledSelect>
        {FormattedError}
      </Styles>
    );
  }
);

SingleSelect.displayName = "SingleSelect";
SingleSelect.defaultProps = {
  value: "",
  options: [],
};

function getFormattedLabel(
  label: SingleSelectProps["label"],
  id: SingleSelectProps["id"]
): ReactNode {
  if (!label) {
    return null;
  }

  if (typeof label === "string") {
    return (
      <label htmlFor={id} className="Label">
        {label}
      </label>
    );
  }

  return label;
}

function getFormattedError(error: SingleSelectProps["error"]): ReactNode {
  if (!error) {
    return null;
  }

  if (typeof error === "string") {
    return <span className="Error">{error}</span>;
  }

  return error;
}
