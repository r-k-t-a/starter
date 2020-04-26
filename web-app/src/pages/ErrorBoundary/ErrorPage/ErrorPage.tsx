import { css, jsx } from '@emotion/core';
import { FC } from 'react';

import { Heading } from '@rkta/ui';
import { EmojiSad } from '@rkta/entypo';

interface Props {
  message?: string;
}

export const ErrorPage: FC<Props> = ({ message = 'Unknown error' }): JSX.Element => (
  <div
    css={css`
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 90vh;
      margin: auto;
      max-width: 800px;
      text-align: center;
      > svg {
        margin: 40px;
      }
    `}
  >
    <EmojiSad size={48} />
    <Heading baseline level={1}>
      Error
    </Heading>
    <p>{message}</p>
  </div>
);
