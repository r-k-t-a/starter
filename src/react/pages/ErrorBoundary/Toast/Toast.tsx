import { css, jsx } from '@emotion/core';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, SHIFT_ERROR } from 'src/react/reducers';
import { Addon, Button, List, ListItem, ListTitle, useFx } from '@rkta/ui';
import { Cross } from '@rkta/entypo';

export const Toast: FC<{}> = (): JSX.Element => {
  const [error] = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const [fx, setFx] = useFx('popUp', {
    onFadeDown: () => {
      dispatch({ type: SHIFT_ERROR });
      setFx('popUp');
    },
  });
  return (
    error && (
      <List
        {...fx}
        bgColor="text"
        css={[
          fx.css,
          css`
            bottom: 16px;
            position: fixed;
            right: 16px;
            width: 320px;
            button {
              margin-right: 8px;
            }
          `,
        ]}
        color="paper"
        rize={1}
      >
        <ListTitle color="error" fitAll>
          <Addon main>{error.name}</Addon>
          <Button
            color="paper"
            round
            transparent
            onClick={(): void => {
              setFx('fadeDown');
            }}
          >
            <Cross />
          </Button>
        </ListTitle>
        <ListItem>{error.message}</ListItem>
      </List>
    )
  );
};
