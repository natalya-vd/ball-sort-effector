import { useList, useStore } from 'effector-react';
import { FC } from 'react';

import { Button } from '../../components/button/Button';
import { Container } from '../../components/container/Container';
import { Content } from '../../components/content/Content';
import { $moves } from '../../components/moves/model';
import { Moves } from '../../components/moves/Moves';
import { Title } from '../../components/title/Title';
import { $field, tubeClicked } from '../../components/tube/model';
import { Tube } from '../../components/tube/Tube';
import { Won } from '../../components/won/Won';

import {
  $isWon,
  $state,
  restartClicked,
  startClicked,
  toMainMenuClicked,
} from './model';

export const HomePage: FC = () => {
  const state = useStore($state);

  if (state === 'start') {
    return <StartScreen />;
  }

  return <InPlay />;
};

const StartScreen: FC = () => (
  <Content>
    <Title>
      <span>BALL</span>SORT
    </Title>
    <Button onClick={startClicked} text="Start game" />
  </Content>
);

const InPlay: FC = () => {
  const isWon = useStore($isWon);
  const tubes = useList($field, ({ balls, over, complete }, index) => (
    <Tube
      tube={{ balls, over, complete }}
      position={index}
      onClick={tubeClicked}
    />
  ));

  return (
    <>
      <div>
        <Button onClick={toMainMenuClicked} text="←" />
        <Button onClick={restartClicked} text="Restart" />
        <Moves />
      </div>
      <Container>{tubes}</Container>
      {isWon && <WonScreen />}
    </>
  );
};

const WonScreen: FC = () => {
  const moves = useStore($moves);

  return (
    <Won>
      <h1>You won!</h1>
      <h2>In {moves} moves</h2>
      <Button onClick={toMainMenuClicked} text="New game" />
    </Won>
  );
};
