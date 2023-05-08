import { ourApi } from 'api';

export const colorThemeApi = {
  getColorTheme: (userId: any) => {
    return ourApi.get(`/color-theme?userId=${userId}`);
  },
  updateColorTheme: (data: any) => {
    return ourApi.patch('/color-theme', data);
  },
  createColorTheme: (data: any) => {
    return ourApi.post('/color-theme', data);
  },
};
