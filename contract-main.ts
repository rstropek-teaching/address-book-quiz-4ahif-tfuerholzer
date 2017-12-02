/**
 *@author Thomas Fürholzer, HTL-Perg, 4AHIF
 *@requires restify
 */

import { createServer, plugins, Server } from 'restify';
import { contractDoPost } from './contract-post'
import { contractDoGet } from './contract-get';
import { contractDoDelete } from './contract-delete';

export class Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    public constructor(id: number, firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.id = id;
        this.lastName = lastName;
        this.email = email;
    }
}
export class PersonStorage {
    public persons: Array<Person> = new Array<Person>();
    /**
     * @return {boolean} returns true if the person was added
     * @param person Peroson object that should be added
     * Adds a new person if this person (id) doesn't exisit in the array.
     */
    public addPerson(person: Person): boolean {
        if (this.persons.filter((p: Person) => person.id === p.id).length > 0) {
            return false;
        } else {
            this.persons.push(person);
            return true;
        }
    }
}

export let storage: PersonStorage = new PersonStorage;

const port = 8010;

const server: Server = createServer();

server.use(plugins.bodyParser());

server.post("/contacts", contractDoPost);
server.get("/contacts", contractDoGet);
server.del("/contacts/:id", contractDoDelete);

server.listen(port, () => console.log(`Server is now listening to port ${port}`));