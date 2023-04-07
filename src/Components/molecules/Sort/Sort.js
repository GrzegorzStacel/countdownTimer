import React from "react";
import styled from "styled-components";
import Tags from "../Tags/Tags";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";

const Wrapper = styled.div`
  border-radius: 0 20px 0 20px;
  border: 2px solid ${({ theme }) => theme.green};
  border-right: none;
  border-bottom: none;
  background: ${({ theme }) => theme.hover.surface};
  position: absolute;
  left: 0;
  top: 60px;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.on.surface};
  width: 200px;
`;

const TagsStyled = styled(Tags)`
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  align-items: center;
`;

const ParagraphStyled = styled(Paragraph)`
  cursor: pointer;
  width: 100%;
  padding: 10px 80px 10px 50px;
  text-align: left;
  margin: 0;
  border-left: 2px solid transparent;
  &:hover {
    background: ${({ theme }) => theme.surface};
    border-right: 2px solid ${({ theme }) => theme.on.surface};
    background: linear-gradient(
      to right,
      rgba(57, 62, 70, 1),
      rgba(57, 62, 70, 0.7),
      rgba(225, 225, 225, 0.2)
    );
  }
`;

const HeadingStyled = styled(Heading)`
  padding-left: 20px;
  padding-top: 10px;
  cursor: default;
`;

const ButtonStyled = styled(Button)`
  display: block;
  margin: 0 auto 30px;
`;

const Sort = () => {
  return (
    <Wrapper>
      <HeadingStyled>Tytuł</HeadingStyled>
      <ParagraphStyled>Rosnąco</ParagraphStyled>
      <ParagraphStyled>Malejąco</ParagraphStyled>
      <HeadingStyled>Data</HeadingStyled>
      <ParagraphStyled>Rosnąco</ParagraphStyled>
      <ParagraphStyled>Malejąco</ParagraphStyled>
      <HeadingStyled>Tag</HeadingStyled>
      <TagsStyled />
      <ButtonStyled>Domyślnie</ButtonStyled>
    </Wrapper>
  );
};

export default Sort;
