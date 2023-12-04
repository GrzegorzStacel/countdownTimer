import React from "react";
import styled from "styled-components";
import Tags from "../Tags/Tags";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";

const CloseModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  //background-color: rgba(0, 0, 0, 0.4);
`;

const Wrapper = styled.div`
  border-radius: 0 0 20px 20px;
  //border: 2px solid ${({ theme }) => theme.green};
  border-right: none;
  border-bottom: none;
  background: ${({ theme }) => theme.hover.surface};
  //position: absolute;
  //left: 0;
  //top: 60px;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.on.surface};
  //width: 100%;
  position: relative;
  z-index: 999;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 10px 0;
`;

const SectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
`;
const TagsStyled = styled(Tags)`
  display: flex;
  flex-direction: row;
  //gap: 10px;
  margin: 5px 0 0 0;
  //align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
`;

const ParagraphStyled = styled(Paragraph)`
  cursor: pointer;
  width: 85%;
  padding: 10px 30px;
  text-align: center;
  margin: 0 10px;
  border-right: 2px solid transparent;
  box-sizing: border-box;

  &:hover {
    background: ${({ theme }) => theme.surface};
    border-right: 2px solid ${({ theme }) => theme.on.surface};
    //background: linear-gradient(
    //  to right,
    //  rgba(57, 62, 70, 1),
    //  rgba(57, 62, 70, 0.7),
    //  rgba(225, 225, 225, 0.2)
    //);
  }
`;

const HeadingStyled = styled(Heading)`
  cursor: default;
`;

const ButtonStyled = styled(Button)`
  display: block;
  margin: 0 auto 5px;
  padding: 7px;
  width: 100px;
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
