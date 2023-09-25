import { Request, Response } from 'express';
import MovieService from '../services/CreateMovieService';
import AppError from '../errors/errors';

const createMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieData = req.body;
        const movie = await MovieService(movieData);
        res.status(201).json(movie);
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

export default {
    createMovie,
};
