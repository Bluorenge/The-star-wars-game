import { createAsyncThunk } from '@reduxjs/toolkit';

import { colorThemeApi } from 'api/colorTheme';
import { SYSTEM_THEME } from 'constants/themization';
import { handleErrorFromServer } from 'helpers/errorNotification';

export const getColorTheme = createAsyncThunk(
  'color-theme/getColorTheme',
  async (payload: number, { dispatch }) => {
    const { data } = await colorThemeApi.getColorTheme(payload);

    if (!data) {
      await dispatch(
        createColorTheme({
          userId: payload,
          theme: SYSTEM_THEME,
        })
      );

      return;
    }

    return data;
  }
);

export const updateColorTheme = createAsyncThunk(
  'color-theme/updateColorTheme',
  async (payload: any) => {
    try {
      const { data } = await colorThemeApi.updateColorTheme(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);

export const createColorTheme = createAsyncThunk(
  'color-theme/createColorTheme',
  async (payload: any) => {
    try {
      const { data } = await colorThemeApi.createColorTheme(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);
