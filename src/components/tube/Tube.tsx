import { FC } from 'react';
import styled from 'styled-components';

import { Ball } from '../ball/Ball';

import { TubeProps } from './types';

export const Tube: FC<TubeProps> = ({ tube, position, onClick }) => (
  <TubeHolder onClick={onClick} data-position={position}>
    <TubeTop>{tube.over !== null ? <Ball ball={tube.over} /> : null}</TubeTop>
    <TubeGlass data-complete={tube.complete}>
      {tube.balls.map((color, index) => (
        <Ball key={index} ball={color} />
      ))}
    </TubeGlass>
  </TubeHolder>
);

const TubeHolder = styled.div<{ 'data-position': number }>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const TubeTop = styled.div`
  display: flex;
  height: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 4px solid lightgray;
`;

const TubeGlass = styled.div<{ 'data-complete': boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
  align-items: center;
  border: 2px solid lightgray;
  border-top: none;
  width: 3rem;
  height: 10rem;
  padding-bottom: 0.4rem;
  padding-top: 0.4rem;
  border-bottom-left-radius: 2.4rem;
  border-bottom-right-radius: 2.4rem;

  &[data-complete='true'] {
    background-color: lightgray;
  }
`;
