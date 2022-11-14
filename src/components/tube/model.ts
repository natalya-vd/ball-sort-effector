import { MouseEvent } from 'react';
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  guard,
  sample,
} from 'effector';
import shuffle from 'lodash/shuffle';
import head from 'lodash/head';

import { BallColor } from '../ball/types';

import { Tube } from './types';

const BALLS_IN_TUBE = 4;
const COLORS_IN_GAME = 4;

const tubeClicked = createEvent<MouseEvent<HTMLDivElement>>();

const tubeSelected = tubeClicked.map((event) =>
  parseInt(event.currentTarget.dataset.position ?? '', 10),
);

const getCountOfTubes = (colors: number) => colors + 2;

const generateTubesFx = createEffect<{ colorsCount: number }, Tube[]>();

const $tubes = createStore<Tube[]>([]);
const $currentSelectedTubeIndex = createStore<number | null>(null);

const $field = combine(
  $tubes,
  $currentSelectedTubeIndex,
  (tubes, selectedIndex) => {
    return tubes.map((tube, index) => {
      const isCurrent = selectedIndex === index;
      const over = isCurrent ? head(tube.balls)! : null;
      const leftBalls = isCurrent ? tube.balls.slice(1) : tube.balls;

      return { balls: leftBalls, over, complete: isCompleted(tube) };
    });
  },
);
const $filledTubeCount = $field.map(
  (tubes) => tubes.filter(({ complete }) => complete).length,
);

function isCompleted(tube: Tube): boolean {
  if (tube.balls.length === BALLS_IN_TUBE) {
    const firstBall = head(tube.balls);
    return tube.balls.every((ball) => ball === firstBall);
  }
  return false;
}

generateTubesFx.use(({ colorsCount }) => {
  const tubesCount = getCountOfTubes(colorsCount);
  const availableBalls = shuffle(
    Array.from(
      { length: BALLS_IN_TUBE * colorsCount },
      (_, index) => (index % BALLS_IN_TUBE) as BallColor,
    ),
  );

  const filledTubes = Array.from({ length: colorsCount }).map(() => ({
    balls: Array.from({ length: BALLS_IN_TUBE }).map(
      () => availableBalls.pop()!,
    ),
  }));

  const emptyTubes = Array.from({ length: tubesCount - colorsCount }).map(
    () => ({ balls: [] }),
  );

  return [...filledTubes, ...emptyTubes];
});

$tubes.on(generateTubesFx.doneData, (_, tubes) => tubes);

const tubeWillChange = sample({
  clock: tubeSelected,
  source: [$tubes, $currentSelectedTubeIndex],
  fn: ([tubes, currentIndex], selectedIndex) => ({
    tubes,
    currentIndex,
    selectedIndex,
  }),
});

const ballUplift = guard({
  source: tubeWillChange,
  filter: ({ tubes, currentIndex, selectedIndex }) => {
    return currentIndex === null && tubes[selectedIndex].balls.length !== 0;
  },
});

$currentSelectedTubeIndex.on(
  ballUplift,
  (_, { selectedIndex }) => selectedIndex,
);

const ballDownliftBack = guard({
  source: tubeWillChange,
  filter: ({ currentIndex, selectedIndex }) => {
    return selectedIndex === currentIndex;
  },
});

$currentSelectedTubeIndex.on(ballDownliftBack, () => null);

const ballMoved = guard({
  source: tubeWillChange,
  filter: ({ tubes, currentIndex, selectedIndex }) => {
    if (currentIndex === null) return false;
    if (currentIndex === selectedIndex) return false;

    const sourceTube = tubes[currentIndex];
    const targetTube = tubes[selectedIndex];

    const sourceBall = head(sourceTube.balls);
    const targetBall = head(targetTube.balls);
    const isTargetTubeEmpty = targetBall === undefined;

    return isTargetTubeEmpty ? true : targetBall === sourceBall;
  },
});

$tubes.on(ballMoved, (_, { tubes, currentIndex, selectedIndex }) => {
  const sourceBall = head(tubes[currentIndex!].balls)!;

  return tubes.map((tube, index) => {
    if (index === currentIndex) return { balls: tube.balls.slice(1) };
    if (index === selectedIndex) return { balls: [sourceBall, ...tube.balls] };
    return tube;
  });
});
$currentSelectedTubeIndex.on(ballMoved, () => null);

export {
  $tubes,
  $field,
  $currentSelectedTubeIndex,
  $filledTubeCount,
  generateTubesFx,
  getCountOfTubes,
  tubeClicked,
  ballMoved,
  COLORS_IN_GAME,
};
