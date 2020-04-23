import React, { FC } from 'react';
import { Rocket } from '@rkta/entypo';
import { Heading, Button, Divider, Popover, List, ListButton } from '@rkta/ui';
import { Link } from 'react-router-dom';

import { usePage } from 'hook';

import { Box } from './Box';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, SET_LANGUAGE, LanguageSetAction } from 'reducer';

export const Home: FC<{}> = (): JSX.Element => {
  const [page] = usePage();
  const { availableLanguages, currentLanguage } = useSelector(
    ({ language }: RootState) => language,
  );
  const dispatch = useDispatch();
  const { heading, menu = [] } = page || {};
  return (
    <Box>
      <Box>
        <Rocket size={56} />
        <Heading baseline level={1}>
          {heading}
        </Heading>
        <Popover>
          <Button>Poyekhali ({currentLanguage}) </Button>
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
            {name}
          </Button>
        ))}
        <Divider verticalSpace={26} />
        {/* {data?.countries.map(({ name }: { name: string }) => (
          <div key={name}>{name}</div>
        ))} */}
      </Box>
    </Box>
  );
};
