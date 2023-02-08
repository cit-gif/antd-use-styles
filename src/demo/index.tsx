import { notification } from 'antd';
import { useReducer } from 'react';
import { createStyles, useStyles as useStylesAntd } from 'antd-use-styles';

const useStyles = createStyles<{ isPrimary: boolean }>(({ token }, params) => {
  return {
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: params?.isPrimary ? token.colorPrimary : token.colorSuccess,
      cursor: 'pointer',
      borderRadius: token.borderRadiusLG,
      border: '0px',
      padding: token.paddingSM,
      color: token.colorBgBase,
      marginRight: token.marginMD,
      ':hover': {
        opacity: 0.95,
      },
      ':active': {
        opacity: 0.8,
      },
    },
  };
});

export default function Demo() {
  const [isPrimary, toggleIsPrimary] = useReducer((state) => {
    return !state;
  }, true);

  const styles = useStyles({ isPrimary: isPrimary });

  const stylesButton2 = useStylesAntd(({ token }) => ({
    backgroundColor: token.colorPrimary,
    cursor: 'pointer',
    borderRadius: token.borderRadiusLG,
    border: '0px',
    padding: token.paddingSM,
    color: token.colorBgBase,
    ':hover': {
      opacity: 0.95,
    },
    ':active': {
      opacity: 0.8,
    },
  }));

  const onBtn1Click = () => {
    toggleIsPrimary();
    notification.success({
      message: 'Button 1 clicked!',
    });
  };
  const onBtn2Click = () => {
    notification.success({
      message: 'Button 2 clicked!',
    });
  };
  return (
    <div className={styles.root}>
      <button onClick={onBtn1Click} className={styles.button}>
        Button 1
      </button>
      <button onClick={onBtn2Click} className={stylesButton2}>
        Button 2
      </button>
    </div>
  );
}
