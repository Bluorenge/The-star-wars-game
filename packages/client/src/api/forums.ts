import { ourApi } from 'api';
import {
  CreateForumModel,
  CreateMessageModel,
  CreateThreadModel,
} from 'models/forum.model';

export const forumApi = {
  getForums: () => {
    return ourApi.get('/forums');
  },
  getForumById: (id: number) => {
    return ourApi.get(`/forums/${id}`);
  },
  createForum: (forum: CreateForumModel) => {
    return ourApi.post('/forums', forum);
  },

  getThreadById(id: number) {
    return ourApi.get(`/threads/${id}`);
  },
  createThread(thread: CreateThreadModel) {
    return ourApi.post(`/threads`, thread);
  },

  getThreadMessageById(id: number) {
    return ourApi.get(`/messages/${id}`);
  },
  createMessage(message: CreateMessageModel) {
    return ourApi.post(`/messages`, message);
  },
};
