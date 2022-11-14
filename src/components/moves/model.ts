import { createStore } from 'effector';

import { ballMoved } from '../tube/model';

const $moves = createStore(0);

$moves.on(ballMoved, (count) => count + 1);

export { $moves };
