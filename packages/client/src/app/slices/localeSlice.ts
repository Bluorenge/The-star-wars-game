import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocaleType } from 'typings/app';

const initialState = 'en' as LocaleType;

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (_, action: PayloadAction<LocaleType>) => {
      return action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
