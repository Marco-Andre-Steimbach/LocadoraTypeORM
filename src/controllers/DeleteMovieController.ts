import { Request, Response } from 'express';
import deleteMovieService from '../services/DeleteMovieService';
import AppError from '../errors/errors';

const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieId = parseInt(req.params.id, 10);

    if (isNaN(movieId)) {
      throw new AppError('ID do filme é inválido', 400);
    }

    await deleteMovieService(movieId);
    res.status(204).end();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

export default {
  deleteMovie,
};
