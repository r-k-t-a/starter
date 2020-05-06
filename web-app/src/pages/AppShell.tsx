import { jsx, css } from '@emotion/core';
import { Spinner } from '@rkta/ui';

const styles = css`
  display: flex;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;

export default function Shell(): JSX.Element {
  return (
    <div css={styles}>
      <Spinner />
    </div>
  );
}
