import { jsx } from '@emotion/core';
import { Rocket } from '@rkta/entypo';
import { Heading, Button, Divider, Popover, List, ListButton, Placeholder } from '@rkta/ui';
import { Link } from 'react-router-dom';

import { usePage } from 'hook';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, SET_LANGUAGE, LanguageSetAction, HomePage, MenuItem } from 'reducer';
import { Box } from './Box';

const defaultMenu = [{}, {}] as MenuItem[];

export const Home = (): JSX.Element => {
  const [page] = usePage<HomePage>();
  const { availableLanguages, currentLanguage } = useSelector(
    ({ language }: RootState) => language,
  );
  const dispatch = useDispatch();
  const { cta, heading, menu = defaultMenu } = page || {};
  return (
    <Box>
      <Box>
        <Rocket size={56} />
        <Heading baseline level={1}>
          <Placeholder width="3em">{heading}</Placeholder>
        </Heading>
        <br />
        <Popover>
          <Button>
            <Placeholder width="6.8em">{cta && `${cta} (${currentLanguage})`}</Placeholder>
          </Button>
          <List rize={1}>
            {availableLanguages.map(({ token, name }) => (
              <ListButton
                bgColor={currentLanguage === token ? 'primary1' : undefined}
                key={token}
                onClick={(): void => {
                  const action: LanguageSetAction = { token, type: SET_LANGUAGE };
                  dispatch(action);
                }}
              >
                {name}
              </ListButton>
            ))}
          </List>
        </Popover>
        <Divider verticalSpace={26} />
        {menu.map(({ name, path }) => (
          <Button blockLevel element={Link} hard key={path} to={path}>
            <Placeholder width="10em">{name}</Placeholder>
          </Button>
        ))}
        <Divider verticalSpace={26} />
      </Box>
    </Box>
  );
};
