import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod"
import AppError from "../errors/errors";

const errorHandlerMiddleware = async (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    if (err instanceof ZodError) {
        return res.status(400).json({ message: err.flatten().fieldErrors })
    }
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
}

export default errorHandlerMiddleware