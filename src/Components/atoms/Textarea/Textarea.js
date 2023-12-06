import React, { useState } from "react";
import styled from "styled-components";
import Paragraph from "../Paragraph/Paragraph";

const TextareaStyled = styled.textarea`
  background-color: ${({ theme }) => theme.hover.surface};
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  color: ${({ theme }) => theme.on.surface};
  font-weight: ${({ theme }) => theme.bold};
  width: 100%;

  display: inline-block;
  position: relative;

  &:focus {
    outline: ${({ theme }) => theme.on.surface};
  }
`;

function Textarea({ textAreaMaxLength, onChange, value, hideCharCount }) {
  const [text, setText] = useState(value || "");

  const handleChange = (event) => {
    const inputValue = event.target.value;
    console.log(event.target.value, value, text);
    if (inputValue.length <= textAreaMaxLength) {
      setText(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <>
      <TextareaStyled value={text} onChange={handleChange} />
      {hideCharCount ? null : (
        <Paragraph>
          {text.length}/{textAreaMaxLength} characters
        </Paragraph>
      )}
    </>
  );
}

export default Textarea;
