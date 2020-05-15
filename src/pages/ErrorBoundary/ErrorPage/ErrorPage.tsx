import { css, jsx } from '@emotion/core';
import { FC } from 'react';
import { Heading } from '@rkta/ui';
import { EmojiSad } from '@rkta/entypo';

import { Status } from 'src/blocks';

interface Props {
  code: number;
  message: string;
}

export const ErrorPage: FC<Props> = ({ code, message = 'Unknown error' }): JSX.Element => (
  <Status code={code}>
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
  </Status>
);
