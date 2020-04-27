/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { css, jsx, keyframes } from '@emotion/core';
import { FC, useEffect, useState } from 'react';
import { PowerPlug } from '@rkta/entypo';
import { useStore, useDispatch } from 'react-redux';
import { status } from '@logux/client';
import { PUSH_ERROR, ErrorPushAction } from 'reducers';

const blink = keyframes`
  to {
    visibility: hidden;
  }
`;

export const Connection: FC<{}> = (): JSX.Element => {
  const store = useStore() as any;
  const dispatch = useDispatch();
  const [state, setState] = useState<string | null>(null);
  function handleStatusChange(nextStatus: string): void {
    switch (nextStatus) {
      case 'disconnected':
      case 'wait':
        setState(nextStatus);
        break;
      case 'synchronized':
        setState(null);
        break;
      case 'syncError': {
        const action: ErrorPushAction = {
          type: PUSH_ERROR,
          payload: {
            message: 'Our server has closed the connection. Sorry, you can not continue.',
            type: nextStatus,
          },
        };
        dispatch(action);
        break;
      }
      case 'error': {
        const action: ErrorPushAction = {
          type: PUSH_ERROR,
          payload: {
            message: 'Server error. Sorry, we have not saved your changes.',
            type: nextStatus,
          },
        };
        dispatch(action);
        break;
      }
      case 'denied': {
        const action: ErrorPushAction = {
          type: PUSH_ERROR,
          payload: { message: 'No access. Our server has rejected your action.', type: nextStatus },
        };
        dispatch(action);
        break;
      }
      case 'protocolError': {
        const action: ErrorPushAction = {
          type: PUSH_ERROR,
          payload: {
            message: 'Saving is not working. Please reload the page.',
            type: nextStatus,
          },
        };
        dispatch(action);
        break;
      }
      default:
        break;
    }
  }
  function effect(): () => void {
    return status(store.client!, handleStatusChange);
  }
  useEffect(effect, [state]);

  return (state && (
    <PowerPlug
      css={css`
        animation: ${blink} 1s steps(5, start) infinite;
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
        z-index: 1000;
      `}
    />
  )) as JSX.Element;
};
