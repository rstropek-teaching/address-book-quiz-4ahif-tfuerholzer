import {Request,Response,Next} from 'restify'
import {storage} from './contract-main'

export function contractDoGet(request : Request, response : Response, next : Next): void{
    response.setHeader("content-type","application/json");
    response.send(JSON.stringify(storage.persons));
    next();
}
export function contractDoGetID(request : Request, response : Response, next : Next) : void{
    response.setHeader("content-type","application/json");
    storage.persons.filter(person => person.id === request.params.id);
}