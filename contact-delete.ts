import {Request,Response,Next} from 'restify'
import {Person ,storage} from './contact-main'

export function contactDoDelete(request : Request, response : Response, next : Next) : void{
    let personID : number = Number.parseInt(request.params.id);
    //Parsing number
    let description : string = "";
    response.setHeader("content-type","application/json");
    if(personID < 0 || personID === NaN || personID === null){
        response.statusCode = 400;
        description = "Invalid ID supplied"
        //If the number was incorrect (<0 or couldn't be parsed) the status code will be set to 400
    }else{
        response.statusCode = 404;
        description = "Person not found";
        //Here I suppose that the id will not be in the array ...
        storage.forEach((person : Person,num : number) => {
            if(person.id === personID){
                delete(storage[num]);
                response.statusCode = 204;
                description = "Successful operation";
                //... but if it is in the array the person will be deleted and the status code will be set 204
            }
        })
    }
    response.send(description);
    next();
    //sending back the response and calling next
}