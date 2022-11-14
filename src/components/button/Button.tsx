import styled from 'styled-components';

import { ButtonProps } from './types';

const buttonMap = ({ selected, text }: ButtonProps) => ({
  'data-selected': selected ?? false,
  type: 'button',
  children: text,
});

export const Button = styled.button.attrs(buttonMap)`
  background-color: white;
  color: black;
  padding: 0.6rem 1rem;
  font-size: 1.3rem;
  margin: 0 0.2rem;
  border: 2px solid lightgray;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #f1f1f1;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px lightblue;
    border-color: lightblue;
  }
  &[data-selected='true'] {
    border-color: gray;
    background-color: gray;
    color: white;
  }
`;
