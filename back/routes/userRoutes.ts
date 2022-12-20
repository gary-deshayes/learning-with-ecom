import { Router } from 'express';
export const userRoutes = Router();
import { Request, Response } from 'express';
import { auth } from '../middleware/authJwt';
import * as userService from '../services/userService';
import { uploadProfilPics } from '../utils/multerProfilPics';
userRoutes.post('/login', userService.login);

/**
 * Route for creationg merchant
 */
userRoutes.post('/register', userService.register);
userRoutes.get('/me', auth, userService.me);
userRoutes.post('/me', auth, userService.saveMe);
userRoutes.get('/photo/:id', userService.profilPics);
userRoutes.post('/photo', auth, uploadProfilPics.single('avatar'), userService.profil);