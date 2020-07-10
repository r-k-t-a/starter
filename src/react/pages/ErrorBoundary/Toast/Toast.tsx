import { css, jsx } from '@emotion/core';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, SHIFT_ERROR } from 'src/react/reducers';
import {
  Addon,
  Button,
  List,
  ListItem,
  ListTitle,
  FloatingArea,
  useMedia,
  RktaTheme,
} from '@rkta/ui';
import { Cross } from '@rkta/entypo';

const box = (theme: RktaTheme) => css`
  width: 320px;
  @media ${theme.media.phone} {
    width: 100%;
  }
`;

export const Toast: FC = (): JSX.Element => {
  const [error] = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const shiftError = () => dispatch({ type: SHIFT_ERROR });
  const { phone } = useMedia();

  return (
    <FloatingArea
      active={!!error}
      align="bottom-right"
      offset={8}
      onEscape={shiftError}
      blockLevel={phone || false}
    >
      <List bgColor="text" color="paper" css={box} rize={1}>
        <ListTitle color="error" fitAll>
          <Addon main>{error?.name}</Addon>
          <Button color="paper" round transparent onClick={shiftError}>
            <Cross />
          </Button>
        </ListTitle>
        <ListItem>{error?.message}</ListItem>
      </List>
    </FloatingArea>
  );
};
