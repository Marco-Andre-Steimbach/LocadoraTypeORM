import { Request, Response } from 'express';
import getMoviesWithPagination from '../services/GetMovieService';

const getMovies = async (req: Request, res: Response): Promise<void> => {
  const { page, perPage, order, sort } = req.query;

  try {
    const movies = await getMoviesWithPagination(
      parseInt(page as string, 10),
      parseInt(perPage as string, 10),
      order as 'asc' | 'desc',
      sort as 'id' | 'price' | 'duration'
    );

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default getMovies;
