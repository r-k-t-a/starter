import { jsx } from '@emotion/core';
import { Button, Heading, Divider, Placeholder } from '@rkta/ui';
import { Facebook, Twitter, Youtube, Vk } from '@rkta/entypo';
import { usePage } from 'src/react/hooks';
import { Link } from 'react-router-dom';

import { Status } from 'src/react/blocks';
import { MenuItem, NotFoundPagePayload } from 'src/react/reducers';
import { main, nav } from './NotFound.css';

const defaultMenu = ([{}] as unknown) as MenuItem[];

export default (): JSX.Element => {
  const [page] = usePage<NotFoundPagePayload>();
  const { heading, hero, menu = defaultMenu } = page || {};
  return (
    <Status code={404}>
      <div css={main}>
        <Heading color="primary" level={1}>
          <Placeholder width="2em">{hero}</Placeholder>
        </Heading>
        <Heading level={5}>
          <Placeholder width="6em">{heading}</Placeholder>
        </Heading>
        {menu.map(({ name, path }) => (
          <Button blockLevel element={Link} hard key={path} to={path}>
            <Placeholder width="8.4em">{name}</Placeholder>
          </Button>
        ))}
        <Divider invisible verticalSpace={16} />
        <nav css={nav}>
          <Button round>
            <Facebook />
          </Button>
          <Button round>
            <Vk />
          </Button>
          <Button round>
            <Twitter />
          </Button>
          <Button round>
            <Youtube />
          </Button>
        </nav>
      </div>
    </Status>
  );
};
