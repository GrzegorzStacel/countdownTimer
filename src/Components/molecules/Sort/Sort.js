import React from "react";
import styled from "styled-components";
import Tags from "../Tags/Tags";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon";
import CloseModal from "../../atoms/CloseModal/CloseModal";

const Wrapper = styled.div`
  border-radius: 0 0 20px 20px;
  border-right: none;
  border-bottom: none;
  background: ${({ theme }) => theme.hover.surface};
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.on.surface};
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
  margin: 5px 0 0 0;
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

const ButtonIconStyled = styled(ButtonIcon)`
  width: 60px;
  height: 60px;
`;

const ButtonStyled = styled(Button)`
  display: block;
  margin: 0 auto 5px;
  padding: 7px;
  width: 100px;
`;

const Sort = ({
  onClick,
  onClose,
  onClickSortByTag,
  onClickShowEverything,
}) => {
  return (
    <>
      <CloseModal onClick={onClose} />
      <Wrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SectionStyled>
          <HeadingStyled>Tytuł</HeadingStyled>
          <ParagraphStyled onClick={() => onClick("title", "asc")}>
            Rosnąco
          </ParagraphStyled>
          <ParagraphStyled onClick={() => onClick("title", "desc")}>
            Malejąco
          </ParagraphStyled>
        </SectionStyled>
        <SectionStyled>
          <HeadingStyled>Czas</HeadingStyled>
          <ParagraphStyled onClick={() => onClick("timeToEnd", "asc")}>
            Rosnąco
          </ParagraphStyled>
          <ParagraphStyled onClick={() => onClick("timeToEnd", "desc")}>
            Malejąco
          </ParagraphStyled>
        </SectionStyled>
        <SectionStyled>
          <ButtonStyled onClick={() => onClickShowEverything()}>
            Pokaż wszystko
          </ButtonStyled>
        </SectionStyled>
        <SectionStyled>
          <TagsStyled onClickSortByTag={onClickSortByTag} />
        </SectionStyled>
        <SectionStyled>
          <ButtonIconStyled closeButton onClick={onClose} />
        </SectionStyled>
      </Wrapper>
    </>
  );
};

export default Sort;
