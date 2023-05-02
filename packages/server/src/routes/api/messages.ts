import { Router } from 'express';

import { messagesController } from '../../controllers/messages';

export const messagesRouter = Router();

messagesRouter.get('/messages', messagesController.getMessages);
messagesRouter.post('/messages', messagesController.createMessage);

messagesRouter.get('/messages/:id', messagesController.getMessageById);
messagesRouter.patch('/messages/:id', messagesController.updateMessage);
messagesRouter.delete('/messages/:id', messagesController.deleteMessage);
