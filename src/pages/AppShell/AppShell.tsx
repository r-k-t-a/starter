import { jsx } from '@emotion/core';
import { Rocket } from '@rkta/entypo';

import { styles } from './AppShell.css';

export default function AppShell(): JSX.Element {
  return (
    <div css={styles}>
      <div>
        <Rocket />
      </div>
    </div>
  );
}
