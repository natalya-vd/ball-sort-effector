import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { BallColor } from '../ball/types';

export interface TubeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tube: {
    balls: BallColor[];
    over: BallColor | null;
    complete: boolean;
  };
  position: number;
}

export interface Tube {
  balls: BallColor[];
}
