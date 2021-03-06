/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { css, jsx, keyframes } from '@emotion/core';
import { FC, useEffect, useState } from 'react';
import { PowerPlug } from '@rkta/entypo';
import { useStore } from 'react-redux';
import { status } from '@logux/client';
import { LoguxReduxStore } from '@logux/redux';
import { ErrorPushAction, PUSH_ERROR } from 'src/react/reducers';
import { RktaTheme } from '@rkta/ui';

const blink = keyframes`
  to {
    visibility: hidden;
  }
`;

export const Connection: FC = (): JSX.Element => {
  const store = useStore() as LoguxReduxStore;
  const [state, setState] = useState<string | null>(null);
  function handleStatusChange(nextStatus: string): void {
    switch (nextStatus) {
      case 'disconnected':
      case 'wait':
      case 'syncError':
        setState(nextStatus);
        break;
      case 'error':
      case 'denied':
      case 'protocolError': {
        const action: ErrorPushAction = {
          type: PUSH_ERROR,
          payload: { name: 'Error', message: 'Unknown error', type: nextStatus },
        };
        store.dispatch(action);
        break;
      }
      case 'synchronized':
        setState(null);
        break;
      default:
        break;
    }
  }
  function effect(): () => void {
    return status(store.client!, handleStatusChange);
  }
  useEffect(effect, [state]);

  return (state && (
    <div
      css={(theme: RktaTheme) => css`
        align-items: center;
        background-color: ${theme.color.color16};
        border-radius: 56px;
        box-shadow: ${theme.shadow[1]};
        display: flex;
        height: 56px;
        justify-content: center;
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
        width: 56px;
        z-index: 1000;
        > svg {
          animation: ${blink} 1s steps(5, start) infinite;
        }
      `}
    >
      <PowerPlug />
    </div>
  )) as JSX.Element;
};
