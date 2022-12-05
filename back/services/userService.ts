
/**
 * Service who contains all fonction for creating and manage merchant
 */
import { Merchant } from '../models/Merchant';
import { Request, Response } from 'express';
// import { CustomRequest } from '../middleware/auth';
import { getErrorMessage } from '../utils/errors.util';
import bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const SECRET_KEY: Secret = 'your-secret-key-here';
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

export async function login(req: Request, res: Response) {
    console.log('test');

    try {
        const foundUser = await Merchant.findOne({ email: req.body.email });

        if (!foundUser) {
            throw new Error('Name of user is not correct');
        }

        const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);

        if (isMatch) {
            const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, {
                expiresIn: '2 days',
            });

            res.send({ user: { _id: foundUser._id, email: foundUser.email }, token: token });
        } else {
            throw new Error('Password is not correct');
        }
    } catch (error) {
        res.send(getErrorMessage(error));
    }
}
export async function loginGraph(parent, args, { req: Request, res: Response }) {
    try {
        const foundUser = await Merchant.findOne({ email: args.input.email });

        if (!foundUser) {
            throw new Error('Name of user is not correct');
        }

        const isMatch = bcrypt.compareSync(args.input.password, foundUser.password);

        if (isMatch) {
            const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, {
                expiresIn: '2 days',
            });

            return {
                status: "success",
                access_token: token
            }
        } else {
            throw new Error('Password is not correct');
        }
    } catch (error) {
        return  {
            status: error,
            access_token: ""
        }
    }
}