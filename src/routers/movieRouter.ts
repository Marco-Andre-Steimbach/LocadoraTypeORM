import express from 'express';
import MovieController from '../controllers/CreateMovieController'
import validateBodyMiddleware from '../middlewares/validaBody.middlewares';
import movieSchema from '../schemas/movieSchemas';
import DeleteMovie from '../controllers/DeleteMovieController'
import PatchMovie from '../controllers/PatchMovieController'
import { verifyName } from '../middlewares/validatedNameExists.middleware'
import getMovies from '../controllers/GetMovieController'; 
import { movieSchemaPatch } from '../schemas/movieSchemas';

const router = express.Router();

router.post('/movies', validateBodyMiddleware(movieSchema), MovieController.createMovie);
router.get('/movies', getMovies); 
router.delete('/movies/:id', DeleteMovie.deleteMovie);
router.patch('/movies/:id', validateBodyMiddleware(movieSchemaPatch), verifyName, PatchMovie.updateMovie);

export default router;
