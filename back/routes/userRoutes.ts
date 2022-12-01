import { Router } from 'express';
export const userRoutes = Router();
import { Request, Response } from 'express';
// import { CustomRequest } from '../middleware/auth';
import * as userService from '../services/userService';

userRoutes.post('/login', (req: Request, res: Response) => {

});

/**
 * Route for creationg merchant
 */
userRoutes.post('/register', userService.register);