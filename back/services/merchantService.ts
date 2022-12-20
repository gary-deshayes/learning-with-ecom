
/**
 * Service who contains all fonction for creating and manage merchant
 */
import { Merchant } from '../models/Merchant';
import { Request, Response } from 'express';
// import { CustomRequest } from '../middleware/auth';
import { getErrorMessage } from '../utils/errors.util';

export async function getAllMerchant(req: Request, res: Response) {
    try {
        console.log('test');
        
        const merchants = await Merchant.find({}, {}, { skip: 0, limit: 8});
        return res.send(merchants)
    } catch (error) {
        res.send(getErrorMessage(error));
    }
}
