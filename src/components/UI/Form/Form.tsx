import * as RadixForm from "@radix-ui/react-form";
import { StyledForm } from "./styles";

export interface FormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ onSubmit, ...props }: FormProps) => {
  return (
    <StyledForm onSubmit={onSubmit} className="FormRoot" {...props}>
      <RadixForm.Field className="FormField" name="question">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <RadixForm.Label className="FormLabel">Question</RadixForm.Label>
          <RadixForm.Message className="FormMessage" match="valueMissing">
            Please enter a question
          </RadixForm.Message>
        </div>
        <RadixForm.Control asChild>
          <textarea className="Textarea" required />
        </RadixForm.Control>
      </RadixForm.Field>
      <RadixForm.Submit asChild>
        <button className="Button" style={{ marginTop: 10 }}>
          Post question
        </button>
      </RadixForm.Submit>
    </StyledForm>
  );
};
