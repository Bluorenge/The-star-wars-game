import { Router } from 'express';

import { colorThemeController } from '../../controllers/colorTheme';

export const colorThemeRouter = Router();

colorThemeRouter.get('/color-theme', colorThemeController.getColorTheme);
colorThemeRouter.post('/color-theme', colorThemeController.createColorTheme);
colorThemeRouter.patch('/color-theme', colorThemeController.updateColorTheme);
