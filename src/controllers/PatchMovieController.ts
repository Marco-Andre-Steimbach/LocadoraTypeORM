import { Request, Response } from 'express';
import updateMovieService from '../services/PatchMovieService';
import AppError from '../errors/errors';

const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieId = parseInt(req.params.id, 10);

    if (isNaN(movieId)) {
      throw new AppError('Movie not found', 404);
    }

    const updateData = req.body;

    const updatedMovie = await updateMovieService(movieId, updateData);

    res.status(200).json(updatedMovie);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

export default {
  updateMovie,
};
