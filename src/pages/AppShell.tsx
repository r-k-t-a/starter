import { jsx, css, keyframes } from '@emotion/core';
import { Rocket } from '@rkta/entypo';

const heartbeat = keyframes`
  0% {
    transform: scale(0.8);
  }
  5% {
    transform: scale(0.9);
  }
  10% {
    transform: scale(0.8);
  }
  15% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(0.8);
  }
`;

const styles = css`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
  > div {
    animation: ${heartbeat} 1.2s ease infinite;
    width: 112px;
    height: 112px;
    will-change: transform;
    > svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export default function Shell(): JSX.Element {
  return (
    <div css={styles}>
      <div>
        <Rocket />
      </div>
    </div>
  );
}
