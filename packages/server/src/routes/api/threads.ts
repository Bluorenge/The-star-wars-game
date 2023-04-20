import { Router } from 'express';

import { threadsController } from '../../controllers/threads';

export const threadsRouter = Router();

threadsRouter.get('/threads', threadsController.getThreads);
threadsRouter.post('/threads', threadsController.createThread);

threadsRouter.get('/threads/:id', threadsController.getThreadById);
threadsRouter.patch('/threads/:id', threadsController.updateThread);
threadsRouter.delete('/threads/:id', threadsController.deleteThread);
