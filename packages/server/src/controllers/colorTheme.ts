import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { NotFoundError } from '../models/error';
import { UserThemeModel } from '../models/theme';

const getColorTheme: RequestHandler = async (req, res) => {
  const userId = req.query.userId as string;

  const theme = await UserThemeModel.findOne({
    where: { userId },
  });

  res.json(theme?.theme);
};

const createColorTheme: RequestHandler = async (req, res) => {
  const { userId, theme } = req.body;

  const createdTheme = await UserThemeModel.create({
    userId,
    theme,
  });

  res.status(StatusCodes.CREATED);
  res.json(createdTheme.theme);
};

const updateColorTheme: RequestHandler = async (req, res) => {
  const { userId, theme } = req.body;

  const existingColorTheme = await UserThemeModel.findOne({
    where: { userId },
  });
  if (!existingColorTheme) {
    throw new NotFoundError(`theme with id = ${userId} not found`);
  }

  const updatedColorTheme = await UserThemeModel.update(
    { userId: Number(userId), theme },
    { where: { userId }, returning: true }
  );

  res.status(StatusCodes.OK);
  res.json(updatedColorTheme[1][0].get().theme);
};

export const colorThemeController = {
  getColorTheme,
  createColorTheme,
  updateColorTheme,
};
