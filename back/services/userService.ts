
/**
 * Service who contains all fonction for creating and manage merchant
 */
import { Merchant } from '../models/Merchant';
import { Request, Response } from 'express';
// import { CustomRequest } from '../middleware/auth';
import { getErrorMessage } from '../utils/errors.util';
import bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import path from 'path'
import fs from 'fs'

export async function profilPics(req: Request, res: Response) {
    let pathImg = path.join(__dirname, '../uploads/profile_pics/' + req.params.id + '.jpg')
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    } else {
        res.sendFile(path.join(__dirname, '../assets/market.png'))
    }
}

export async function profil(req: Request, res: Response) {
    console.log(req.body);

    res.send('photo uploadée')
}

export async function saveMe(req: Request, res: Response) {
    if (req.body.password.password != req.body.password.passwordConfirm) {
        res.status(500).send('Password not equal to confirm password')
    }
    req.user.password = req.body.password.password
    req.user.email = req.body.user.email
    req.user.description = req.body.user.description
    req.user.address = req.body.user.address
    req.user.save().then((savedUser) => {
        return res.send(savedUser)
    })


}
export async function me(req: Request, res: Response) {
    return res.send(req.user)
}
/**
 * Function who allow to add merchant
 * @param req 
 * @param res 
 */
export async function register(req: Request, res: Response) {
    //Check if passwords are equal

    if (req.body.password != req.body.passwordConfirm) {
        res.status(500).send('Password not equal to confirm password')
    } else {
        //Check unique email and create
        await Merchant.init()
        await Merchant.create({
            email: req.body.email,
            password: req.body.password
        }).then((data) => {
            console.log(data);
            const token = jwt.sign({ _id: data._id?.toString(), name: data.name }, process.env.jwt_secret as Secret, {
                expiresIn: '2 days'
            });
            res.status(201).send({ user: { _id: data._id, email: data.email }, token: token });
        })
            .catch(error => {
                let msg = "Error";
                if (error.code == 11000) {
                    msg = "Account already exist in database with this email"
                }
                // Will error, but will *not* be a mongoose validation error, it will be
                // a duplicate key error.
                // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
                res.send({
                    error: getErrorMessage(error),
                    error_message: msg
                });
            });
    }
}

export async function registerGraphQL(parent, args, { req: Request, res: Response }) {
    console.log('test');
    //Check if passwords are equal
    if (args.input.password != args.input.passwordConfirm) {
        console.log(args);
        return 'Password not equal to confirm password'
    } else {
        //Check unique email and create
        await Merchant.init()
        await Merchant.create({
            email: args.input.email,
            password: args.input.password
        }).then((data) => {
            console.log({
                status: 'success',
                user: {
                    id: data._id.toString(),
                    email: data.email
                }
            });

            return {
                status: 'success',
                user: {
                    id: data._id.toString(),
                    email: data.email
                }
            }
        })
            .catch(error => {
                let msg = "Error";
                if (error.code == 11000) {
                    msg = "Account already exist in database with this email"
                }
                // Will error, but will *not* be a mongoose validation error, it will be
                // a duplicate key error.
                // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
                return {
                    message: getErrorMessage(error)
                }
            });
        console.log("pase ici ?");

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
            const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, process.env.jwt_secret as Secret, {
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
            const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, process.env.jwt_secret as Secret, {
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
        return {
            status: error,
            access_token: ""
        }
    }
}