import {
  aqua,
  darkGrey,
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

export const StyledAsidePanel = styled.aside`
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

export const StyledTitle = styled.h2`
  margin: 0;
  font-weight: 400;
  text-transform: capitalize;
  font-size: 21px;
  text-align: center;
  font-style: italic;
  font-weight: 500;
  letter-spacing: 1px;
  color: ${aqua};
`;

export const StyledTitleNotification = styled(StyledTitle)`
  color: ${orange};
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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
