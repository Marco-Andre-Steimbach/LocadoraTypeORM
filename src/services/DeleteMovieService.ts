import { Repository } from 'typeorm';
import MovieEntity from '../entities/movies.entity';
import AppError from '../errors/errors';
import { AppDataSource } from '../data-source';

const deleteMovie = async (movieId: number): Promise<void> => {
    const movieRepository: Repository<MovieEntity> = AppDataSource.getRepository(
        MovieEntity
    );

    const movieToDelete = await movieRepository.findOne({ where: { id: movieId } });
    if (!movieToDelete) {
        throw new AppError('Movie not found', 404);
    }

    await movieRepository.remove(movieToDelete);
};

export default deleteMovie;
