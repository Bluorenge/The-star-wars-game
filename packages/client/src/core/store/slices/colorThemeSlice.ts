import { createSlice } from '@reduxjs/toolkit';

import { ThemeType } from 'typings/app';
import {
  createColorTheme,
  getColorTheme,
  updateColorTheme,
} from 'core/store/actions/colorThemeActions';
import { THEME_LIGHT } from 'constants/themization';

const initialState = '';

export const colorThemeSlice = createSlice({
  name: 'color-theme',
  initialState,
  reducers: {
    setDefaultTheme: () => THEME_LIGHT,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getColorTheme.fulfilled,
      (_, action) => action.payload as ThemeType
    );
    builder.addCase(
      createColorTheme.fulfilled,
      (_, action) => action.payload as ThemeType
    );
    builder.addCase(
      updateColorTheme.fulfilled,
      (_, action) => action.payload as ThemeType
    );
  },
});

export const { setDefaultTheme } = colorThemeSlice.actions;

export default colorThemeSlice.reducer;
