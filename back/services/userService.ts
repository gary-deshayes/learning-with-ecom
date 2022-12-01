
/**
 * Service who contains all fonction for creating and manage merchant
 */
import { Merchant } from '../models/Merchant';
import { Request, Response } from 'express';
// import { CustomRequest } from '../middleware/auth';
import { getErrorMessage } from '../utils/errors.util';

/**
 * Function who allow to add merchant
 * @param req 
 * @param res 
 */
export async function register(req: Request, res: Response) {
    //Check if passwords are equal
    if (req.body.password != req.body.confirmpassword) {
        res.status(500).send('Password not equal to confirm password')
    } else {
        //Check unique email and create
        await Merchant.init()
        await Merchant.create({
            email: req.body.email,
            password: req.body.password
        }).then(() => {
            res.status(201).send("Registered");
        })
            .catch(error => {
                let msg = "Error";
                if (error.code == 11000) {
                    msg = "Account already exist in database with this email"
                }
                // Will error, but will *not* be a mongoose validation error, it will be
                // a duplicate key error.
                // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
                res.send(getErrorMessage(error));
            });
    }
}
