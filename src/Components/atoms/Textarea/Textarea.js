import React, { useState } from "react";
import styled from "styled-components";
import Paragraph from "../Paragraph/Paragraph";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const ParagraphStyled = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: 5px;
  right: 0;
  bottom: -30px;
  position: absolute;
`;

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

function Textarea({
  textAreaMaxLength,
  onChange,
  fetchedComments,
  hideCharCount,
}) {
  const [text, setText] = useState(fetchedComments || "");
  const handleChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= textAreaMaxLength) {
      setText(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <>
      <Wrapper>
        <TextareaStyled value={text} onChange={handleChange} />
        {hideCharCount ? null : (
          <ParagraphStyled>
            {text.length}/{textAreaMaxLength}
          </ParagraphStyled>
        )}
      </Wrapper>
    </>
  );
}

export default Textarea;
