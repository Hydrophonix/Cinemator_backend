// Core
import { Response, Request } from 'express';

export interface IContextUser {
    id: string;
}

export interface IContext {
    req: Request;
    res: Response;
    user?: IContextUser;
}
