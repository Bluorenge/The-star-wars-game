import { createAsyncThunk } from '@reduxjs/toolkit';

import { forumApi } from 'api/forums';
import { handleErrorFromServer } from 'helpers/errorNotification';
import { CreateThreadModel, CreateMessageModel } from 'models/forum.model';

export const getForums = createAsyncThunk('forum/getForums', async () => {
  try {
    const { data } = await forumApi.getForums();

    return data;
  } catch (err) {
    handleErrorFromServer(err);
  }
});

export const getForumById = createAsyncThunk(
  'forum/getForumById',
  async (payload: number) => {
    try {
      const { data } = await forumApi.getForumById(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);

export const createForum = createAsyncThunk(
  'forum/createForum',
  async (payload: any) => {
    try {
      const { data } = await forumApi.createForum(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);

export const getThreadById = createAsyncThunk(
  'forum/getThreadById',
  async (payload: number) => {
    try {
      const { data } = await forumApi.getThreadById(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);

export const createThread = createAsyncThunk(
  'forum/createThread',
  async (payload: CreateThreadModel) => {
    try {
      const { data } = await forumApi.createThread(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);

export const createMessage = createAsyncThunk(
  'forum/createMessage',
  async (payload: CreateMessageModel) => {
    try {
      const { data } = await forumApi.createMessage(payload);

      return data;
    } catch (err) {
      handleErrorFromServer(err);
    }
  }
);
