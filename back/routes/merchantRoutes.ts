import { Router } from 'express';

export const merchantRoutes = Router();
import * as merchantService from '../services/merchantService';

merchantRoutes.get('/', merchantService.getAllMerchant);