import {Request,Response,Next} from 'restify'
import {Person ,storage} from './contract-main'

export function contractDoDelete(request : Request, response : Response, next : Next) : void{
    let personID : number = Number.parseInt(request.params.id);
    let description : string = "";
    response.setHeader("content-type","application/json");
    if(personID < 0 || personID === NaN){
        response.statusCode = 400;
        description = "Invalid ID supplied"
    }else{
        response.statusCode = 404;
        description = "Person not found";
        storage.persons.forEach((person : Person,num : number) => {
            if(person.id === personID){
                delete(storage.persons[num]);
                response.statusCode = 204;
                description = "Successful operation";
            }
        })
    }
    response.send(description);
}