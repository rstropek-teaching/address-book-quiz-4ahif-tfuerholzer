import { Request, Response, Next } from 'restify'
import { Person, storage } from './contract-main'

export function contractDoPost(request: Request, response: Response, next: Next): void {
    console.log("POST CALLED!");
    let description: string = "";
    console.log(request.body.id);
    if(request.body.id === undefined || request.body.firstName === undefined || request.body.lastName === undefined || request.body.email === undefined){
        description="Invalid input (e.g. required field missing or empty)";
        response.statusCode = 400;
    }else{
        if (storage.addPerson(new Person(request.body.id, request.body.firstName, request.body.lastName, request.body.email))) {
            response.statusCode = 200;
            description = "Person successfully created";
        } else {
            response.statusCode = 400;
            description = "Person with this id (" + request.body.id + ") already exists!";
        }
    }
    response.send(description);
    next();    
}