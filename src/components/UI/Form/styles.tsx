import styled from "styled-components";
import * as Form from "@radix-ui/react-form";

export const StyledForm = styled(Form.Root)`
  /* reset */
  input,
  textarea,
  button {
    all: unset;
    box-sizing: border-box;
  }

  .FormRoot {
    width: 260px;
  }

  .FormField {
    display: grid;
    margin-bottom: 10px;
  }

  .FormLabel {
    font-size: 15px;
    font-weight: 500;
    line-height: 35px;
    color: black;
  }

  .FormMessage {
    font-size: 13px;
    color: black;
    opacity: 0.8;
  }

  .Input,
  .Textarea {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    font-size: 15px;
    color: black;
    background-color: white;
    box-shadow: 0 0 0 1px black;
  }
  .Input:hover,
  .Textarea:hover {
    box-shadow: 0 0 0 1px black;
  }
  .Input:focus,
  .Textarea:focus {
    box-shadow: 0 0 0 2px black;
  }
  .Input::selection,
  .Textarea::selection {
    background-color: white;
    color: black;
  }

  .Input {
    padding: 0 10px;
    height: 35px;
    line-height: 1;
  }

  .Textarea {
    resize: none;
    padding: 10px;
  }

  .Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
    height: 35px;
    width: 100%;

    background-color: white;
    color: blue;
    box-shadow: 0 2px 10px black;
  }
  .Button:hover {
    background-color: darkblue;
	color: white;
  }
  .Button:focus {
    box-shadow: 0 0 0 2px black;
  }
`;
