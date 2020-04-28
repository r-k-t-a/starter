import { css, jsx } from '@emotion/core';
import { useStore } from 'react-redux';
import { LoguxReduxStore } from '@logux/redux';
import { Button } from '@rkta/ui';

export default (): JSX.Element => {
  const store = useStore() as LoguxReduxStore;
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 100vh;
      `}
    >
      <Button
        bgColor="primary"
        rize={1}
        onClick={(): void => {
          store.log.add({ type: 'unknown/action' }, { sync: true });
        }}
      >
        Trigger unknown action
      </Button>
      <Button
        bgColor="primary"
        rize={1}
        onClick={(): void => {
          store.log.add({ type: 'forbiden/action' }, { sync: true });
        }}
      >
        Trigger forbiden action
      </Button>
    </div>
  );
};
