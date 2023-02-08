import { theme } from 'antd';
import { css, CSSInterpolation } from '@emotion/css';
import { useMemo } from 'react';

const { useToken } = theme;

export type Theme = ReturnType<typeof theme.useToken>;
export type CssFunctionInput<Input = any, Params = any> = (theme: Theme, params?: Params) => Input;

export const createStyles = <Params = any, Input extends Record<string, CSSInterpolation> = Record<string, CSSInterpolation>>(cb: CssFunctionInput<Input, Params>) => {
  function useStyles(params: Params) {
    const themeLocale = useToken();
    const cssObj = cb(themeLocale, params);

    const res = useMemo(() => {
      const keys = Object.keys(cssObj);
      return keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: css(cssObj[key]),
        }),
        {} as { [k in keyof Input]: string },
      );
    }, [cssObj, params]);
    return res;
  }

  return useStyles;
};

export type CssFunction = (params: Theme) => CSSInterpolation;
export const useStyles = (cb: CssFunction) => {
  const themeLocale = useToken();
  return css(cb(themeLocale));
};
