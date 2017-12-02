/**
 *@author Thomas Fürholzer, HTL-Perg, 4AHIF
 *@requires restify
 */

import { createServer, plugins, Server } from 'restify';
import { contactDoPost } from './contact-post'
import { contactDoGet } from './contact-get';
import { contactDoDelete } from './contact-delete';

export class Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    /**
     * @param {int} id id of the person -> should be an integer that is greater or equal 0
     * @param {string} firstName first name of the new person
     * @param {string} lastName last name of the new person
     * @param {string} email email of the person (email syntax is not checked)
     */
    public constructor(id: number, firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.id = id;
        this.lastName = lastName;
        this.email = email;
    }
}
export let storage: Array<Person> = new Array;
//Storage for all Persons

/**
 * Function that checks if a person already existis in the array (same id)
 * @param {Person} newPerson Person to be added
 * @param {Array<Person>} storage  array where all persons are stored
 * @return {boolean} returns true if the person was added and false if not
 */
export function addPerson(newPerson : Person, storage : Array<Person>) : boolean{
    if(storage.filter(person => person.id === newPerson.id).length === 0){
        storage.push(newPerson);
        return true;
    }else{
        return false;
    }
}


const port = process.env.PORT || 8080;
//Defining Port

const server: Server = createServer();
server.use(plugins.bodyParser());
server.post("/contacts", contactDoPost);
server.get("/contacts", contactDoGet);
server.del("/contacts/:id", contactDoDelete);
//Creating server and adding bodyParser plugin as well as setting all methods
server.listen(port, () => console.log(`Server is now listening to port ${port}`));
//Starting server