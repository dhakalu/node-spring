import Component from "../../src/Component";
import InternalServerError from "../../src/errors/InternalServerError";
import GetRequest from "../../src/GetRequest";
import RequestParam from "../../src/RequestParam";
import RestController from "../../src/RestController";

@RestController('/users')
@Component({}) //todo make restcontroller automatically be component
class UserController {

     @GetRequest('/')
    static getUsers(req) {
        return {
            users: [
                {
                    name: 'upen dhakal',
                    email: 'dhakal.upenn@gmail.com',
                }
            ]
        }
    }

    @GetRequest('/error')
    static throwError() {
        const error = new InternalServerError('Some unexpected error occured');
        throw error;
    }

     @GetRequest('/:userId')
    static getUser(@RequestParam('userId') userId: string) {
        // console.log('Request parameter recieved is ', userId);
        return {
                    name: 'upen dhakal',
                    email: 'dhakal.upenn@gmail.com',
        }
    }
}

export default UserController;