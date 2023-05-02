import { Router } from 'express';

import { forumsController } from '../../controllers/forums';

export const forumsRouter = Router();

forumsRouter.get('/forums', forumsController.getForums);
forumsRouter.post('/forums', forumsController.createForum);

forumsRouter.get('/forums/:id', forumsController.getForumById);
forumsRouter.patch('/forums/:id', forumsController.updateForum);
forumsRouter.delete('/forums/:id', forumsController.deleteForum);
