import { NextFunction, Request, Response } from "express";
import {JWT_SECRET} from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";


export const userAuth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers["authorization"];

    if (!token) {
         res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token as string,JWT_SECRET);

    if(decoded) {
        req.userId =  (decoded as JwtPayload).id;
        // overide the types of express request object
        console.log("Jwt verified. Decoded is: " + JSON.stringify(req.userId));
        next(); 
    }
    else {
        res.status(402).json({
            message: "Invalid token, Auth failed"
        })
    }

}

// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
// node_modules/@types/express/indexedDB.databases.ts

// declare module 'express-serve-static-core' {
//     interface Request {
//         userId: JwtPayload | string;
//     }
//     // interface Response {
//     //     myField?: string
//     // }
// }