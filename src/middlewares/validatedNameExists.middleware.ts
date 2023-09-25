import { NextFunction, Request, Response } from "express";
import AppError from "../errors/errors";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { movieRepository } from "../interface/movieInterface";


export const verifyName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const movieRepo: movieRepository = AppDataSource.getRepository(Movie)
    const name: string | undefined = req.body.name
    

    if (!name) {
        return next()
    }

    const movie: boolean = await movieRepo.exist({ where: { name } })

    if (movie) {
        throw new AppError('Movie already exists.', 409);
    }
    return next()
}
