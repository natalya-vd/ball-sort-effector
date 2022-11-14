import { MouseEvent } from 'react';
import { createEvent, createStore, sample, guard } from 'effector';

import {
  $currentSelectedTubeIndex,
  $filledTubeCount,
  COLORS_IN_GAME,
  generateTubesFx,
} from '../../components/tube/model';

import { Store } from './types';
import { $moves } from '../../components/moves/model';

const startClicked = createEvent<MouseEvent<HTMLButtonElement>>();
const restartClicked = createEvent<MouseEvent<HTMLButtonElement>>();
const toMainMenuClicked = createEvent<MouseEvent<HTMLButtonElement>>();

const $state = createStore<Store>('start');
const $isWon = $state.map((state) => state === 'won');

const gameFinishedSuccessfully = createEvent();

$state.on(startClicked, () => 'ingame');

sample({
  clock: [startClicked, restartClicked],
  fn: () => ({ colorsCount: COLORS_IN_GAME }),
  target: generateTubesFx,
});

$currentSelectedTubeIndex.reset(restartClicked);
$moves.reset(restartClicked);
$moves.reset(generateTubesFx);

guard({
  source: $filledTubeCount,
  filter: (filled) => filled === COLORS_IN_GAME,
  target: gameFinishedSuccessfully,
});

$state.on(gameFinishedSuccessfully, () => 'won');

$state.on(toMainMenuClicked, () => 'start');

export { $state, $isWon, startClicked, restartClicked, toMainMenuClicked };
