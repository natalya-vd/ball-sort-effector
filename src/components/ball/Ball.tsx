import styled from 'styled-components';
import { BallComponent } from './BallComponent';

export const Ball = styled(BallComponent)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid black;
  margin: 1px;
  flex-shrink: 0;
  background: radial-gradient(
    circle at 65% 15%,
    white 1px,
    var(--light-color) 3%,
    var(--main-color) 60%,
    var(--light-color) 100%
  );
  position: relative;

  &::after {
    content: '' attr(data-number) '';
    position: absolute;
    top: 6px;
    left: 10px;
    color: white;
    text-shadow: 0 0 1px black;
    display: none;
  }
`;
