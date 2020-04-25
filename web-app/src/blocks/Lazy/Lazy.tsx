import { jsx } from '@emotion/core';
import { ComponentType, FC, lazy, Suspense } from 'react';

interface Props {
  load(): Promise<{ default: ComponentType<unknown> }>;
}

export const Lazy: FC<Props> = ({ load }): JSX.Element => {
  const Element = lazy(load);
  return (
    <Suspense fallback={null}>
      <Element />
    </Suspense>
  );
};
