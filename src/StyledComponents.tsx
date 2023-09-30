import {
  aqua,
  bgMain,
  blue,
  darkGrey,
  darkRed,
  grey,
  lightAqua,
  lightGrey,
  orange,
  smoothWhite,
} from './variables';
import styled from 'styled-components';

export const StyledLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 28px;
  color: ${smoothWhite};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${lightAqua};
  }
`;

export const StyledPanel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border-radius: 5px;
  background-color: ${darkGrey};
  grid-area: panel;
  box-shadow: 0px 0px 10px black inset;
  font-weight: 300;
`;

export const StyledTitle = styled.h2<{ $color?: string }>`
  margin: 0;
  font-weight: 400;
  text-transform: capitalize;
  font-size: 21px;
  text-align: center;
  font-style: italic;
  font-weight: 500;
  letter-spacing: 1px;
  color: ${(props) => props.$color || aqua};
`;

export const StyledTitleNotification = styled(StyledTitle)`
  color: ${orange};
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
  border-bottom: 2px dashed black;
  padding-bottom: 15px;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0px;
  }
`;

export const StyledPhotoUpload = styled(FlexColumn)`
  & .placeholderInput {
    position: relative;
    width: 60px;
    height: 60px;
    filter: brightness(50%);
    path {
      stroke: ${lightGrey};
    }
    ellipse {
      fill: ${lightGrey};
    }
  }
  img {
    max-width: 120px;
    max-height: 60px;
    border-radius: 10px;
  }
  & label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${lightAqua};
    }
    svg {
      width: 20px;
      height: 20px;
      filter: brightness(100%);
    }
  }
`;

export const StyledNameInput = styled(FlexColumn)`
  input {
    padding: 8px;
    border: 3px ${darkGrey} inset;
    background-color: ${grey};
    color: ${lightGrey};
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    box-shadow: 0px 0px 5px black inset;
    text-align: center;
  }
`;

export const StyledSelectExpression = styled(FlexColumn)`
  select {
    cursor: pointer;
    background-color: ${grey};
    padding: 8px;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    color: ${lightGrey};
    border: 3px ${darkGrey} inset;
    box-shadow: 0px 0px 5px black inset;
  }
`;

export const StyledXYSelection = styled(FlexColumn)``;

export const MainButton = styled.button`
  cursor: pointer;
  padding: 10px 25px;
  font-family: 'Roboto', sans-serif;
  background-color: ${bgMain};
  font-size: 15px;
  border: 2px outset ${grey};
  color: #fff;
  box-shadow: 0px 5px 5px black;
  transition: all 0.05s linear;
  &:active {
    translate: 0px 5px;
    box-shadow: 0px 0px 3px black;
    border-color: ${darkGrey};
    color: #d3d3d3;
    box-shadow: 0px 0px 0px black, 0px 0px 5px black inset;
  }
  &:hover {
    color: ${lightAqua};
  }
`;

export const SecondaryButton = styled(MainButton)<{
  $userPhoto?: string | null;
  $userName?: string;
  $isActive?: boolean;
}>`
  transition: all 0.1s ease-in-out;
  padding: 10px;
  width: 70px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  border-radius: 5px;
  color: ${(props) => (props.$isActive ? darkRed : 'green')};
  animation: ${(props) =>
    props.$isActive ? 'none' : 'pulse infinite ease-in-out 2s'};
  &:hover {
    color: ${(props) => (props.$isActive ? darkRed : 'green')};
  }
  @keyframes pulse {
    0% {
      color: #00ff00;
    }
    50% {
      color: #029602;
    }
    100% {
      color: #00ff00;
    }
  }
`;

export const StyledModal = styled.dialog`
  background: ${grey};
  border: none;
  border-top: 3px solid ${orange};
  border-bottom: 3px solid ${orange};
  color: #fff;
  text-align: center;
  width: 100%;
  transition: all 0.4s ease-in-out;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  p {
    i {
      font-weight: 500;
    }
    line-height: 24px;
  }
`;

export const StyledSquaresWrapper = styled.section`
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;
