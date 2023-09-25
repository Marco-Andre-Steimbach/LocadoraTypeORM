import { Repository } from 'typeorm';
import MovieEntity from '../entities/movies.entity';
import MovieInterface from '../interface/movieInterface';
import AppError from '../errors/errors';
import { AppDataSource } from '../data-source';
import movieSchema from '../schemas/movieSchemas'

const MovieService = async (movieData: MovieInterface): Promise<MovieEntity> => {
  try {
    const validatedData = movieSchema.parse(movieData);

    const movieRepository: Repository<MovieEntity> = AppDataSource.getRepository(
      MovieEntity
    );

    const existingMovie = await movieRepository.findOne({
      where: { name: validatedData.name },
    });

    if (existingMovie) {
      throw new AppError('Movie already exists.', 409);
    }

    const movie: MovieEntity = new MovieEntity();
    movie.name = validatedData.name;
    
    if ('description' in validatedData && validatedData.description !== undefined) {
      movie.description = validatedData.description;
    } else {
      movie.description = null;
    }

    movie.duration = validatedData.duration;
    movie.price = validatedData.price;

    await movieRepository.save(movie);

    return movie;
  } catch (error) {
    throw error;
  }
};

export default MovieService

