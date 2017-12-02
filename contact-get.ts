import {Request,Response,Next} from 'restify'
import {storage} from './contact-main' 

export function contactDoGet(request : Request, response : Response, next : Next): void{
    response.setHeader("content-type","application/json");
    response.send(JSON.stringify(storage));
    next();
    //very simple - just sending a stringifiyed Array of persons and calling next
}