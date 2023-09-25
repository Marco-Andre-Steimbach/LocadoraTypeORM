import { Repository } from 'typeorm';
import MovieEntity from '../entities/movies.entity';
import AppError from '../errors/errors';
import { AppDataSource } from '../data-source';

const updateMovie = async (
  movieId: number,
  updateData: Partial<MovieEntity>
): Promise<MovieEntity> => {
  const movieRepository: Repository<MovieEntity> = AppDataSource.getRepository(
    MovieEntity
  );

  try {
    const movieToUpdate = await movieRepository.findOne({ where: { id: movieId } });

    if (!movieToUpdate) {
      throw new AppError('Movie not found', 404);
    }

    const whereCondition: { id: number; name?: string } = { id: movieId };
    if (updateData.name !== undefined) {
      whereCondition.name = updateData.name;
    }

    if (updateData.name !== undefined) {
      movieToUpdate.name = updateData.name;
    }
    if (updateData.description !== undefined) {
      movieToUpdate.description = updateData.description;
    }
    if (updateData.duration !== undefined) {
      movieToUpdate.duration = updateData.duration;
    }
    if (updateData.price !== undefined) {
      movieToUpdate.price = updateData.price;
    }

    await movieRepository.save(movieToUpdate);

    return movieToUpdate;
  } catch (error) {
    throw error;
  }
};

export default updateMovie;
