import { Repository } from 'typeorm';
import MovieEntity from '../entities/movies.entity';
import { AppDataSource } from '../data-source';

const getMoviesWithPagination = async (
  page: number = 1,
  perPage: number = 5,
  order: 'asc' | 'desc' = 'asc',
  sort: 'id' | 'price' | 'duration'
): Promise<{
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: MovieEntity[];
}> => {
  const movieRepository: Repository<MovieEntity> = AppDataSource.getRepository(
    MovieEntity
  );

  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(perPage) || perPage < 1) {
    perPage = 5;
  }
  if (perPage > 5) {
    perPage = 5;
  }

  const validOrders = ['asc', 'desc'];
  if (!validOrders.includes(order)) {
    order = 'asc';
  }

  const validSorts = ['id', 'price', 'duration'];
  if (!validSorts.includes(sort)) {
    sort = 'id';
    if(order === "desc"){
      order = "asc"
    }
  }

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;


  const [data, count] = await movieRepository.findAndCount({
    order: { [sort]: order },
    take: perPage,
    skip: startIndex,
  });


  const baseUrl = 'http://localhost:3000';
  const prevPage =
    page > 1
      ? `${baseUrl}/movies?page=${page - 1}&perPage=${perPage}`
      : null;
  const nextPage =
    endIndex < count
      ? `${baseUrl}/movies?page=${page + 1}&perPage=${perPage}`
      : null;

  return {
    prevPage,
    nextPage,
    count,
    data,
  };
};

export default getMoviesWithPagination;
