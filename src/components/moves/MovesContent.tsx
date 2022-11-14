import { useStore } from 'effector-react';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { $moves } from './model';

type MovesContentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export const MovesContent: FC<MovesContentProps> = ({ ...props }) => {
  const count = useStore($moves);
  return <span {...props}>Moves: {count}</span>;
};
