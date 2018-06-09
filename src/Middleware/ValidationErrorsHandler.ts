import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/check";

export function HandleErrors(req: Request, res: Response, next: NextFunction) : void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
    } else {
        next();
    }
}
