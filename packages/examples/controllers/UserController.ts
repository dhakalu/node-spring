import Core from '@node-spring/core';

const {
    Component,
    InternalServerError,
    GetRequest,
    RequestParam,
    RestController,
} = Core;

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