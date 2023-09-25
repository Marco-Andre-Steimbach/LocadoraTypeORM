import { Repository } from "typeorm";
import { Movie } from "../entities";

interface MovieInterface {
    id: number;
    name: string;
    description: string | null;
    duration: number;
    price: number;
}

export type movieRepository = Repository<Movie>

export default MovieInterface;