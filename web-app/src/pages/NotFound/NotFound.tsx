import { jsx } from '@emotion/core';
import { Button, Heading, Divider, Text, Placeholder } from '@rkta/ui';
import { Facebook, Twitter, Youtube, Vk } from '@rkta/entypo';
import { usePage } from 'hooks';
import { Link } from 'react-router-dom';

import { MenuItem, NotFoundPagePayload } from 'reducers';

const defaultMenu = ([{}] as unknown) as MenuItem[];

export default (): JSX.Element => {
  const [page] = usePage<NotFoundPagePayload>();
  const { heading, hero, menu = defaultMenu } = page || {};
  return (
    <Text center element="div">
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
    </Text>
  );
};
