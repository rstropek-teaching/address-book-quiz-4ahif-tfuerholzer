import { Request, Response, Next } from 'restify'
import { Person, addPerson, storage} from './contact-main'

export function contactDoPost(request: Request, response: Response, next: Next): void {
    let description: string = "";
    if(request.body.id === undefined || request.body.firstName === undefined || request.body.lastName === undefined || request.body.email === undefined){
        description="Invalid input (e.g. required field missing or empty)";
        response.statusCode = 400;
        //if any of these fields are undefined i will send back an error and the status-code 400
    }else{
        if (addPerson(new Person(request.body.id, request.body.firstName, request.body.lastName, request.body.email),storage)) {
            response.statusCode = 200;
            description = "Person successfully created";
            //if adding a new Person was successfull the status-code will be set to 200...
        } else {
            response.statusCode = 400;
            description = "Person with this id (" + request.body.id + ") already exists!";
            //... but if not i return 400
        }
    }
    response.send(description);
    next();
    //sending and calling next
}