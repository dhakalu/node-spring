import Core from "@node-spring/core";

const {
    Component,
    InternalServerError,
    GetRequest,
    RequestParam,
    RestController,
} = Core;

type User = {
    name: string,
    email: string,
    userId: string,
}

@RestController("/users")
@Component({}) //todo make restcontroller automatically be component
class UserController {

     @GetRequest("/")
    static getUsers(): { users: [User]}  {
        return {
            users: [
                {
                    name: "upen dhakal",
                    userId: "dummyuser",
                    email: "dhakal.upenn@gmail.com",
                }
            ]
        };
    }

    @GetRequest("/error")
     static throwError(): void {
         const error = new InternalServerError("Some unexpected error occured");
         throw error;
     }

     @GetRequest("/:userId")
    static getUser(@RequestParam("userId") userId: string): User {
        console.log("Request parameter recieved is ", userId);
        return {
            name: "upen dhakal",
            userId,
            email: "dhakal.upenn@gmail.com",
        };
    }
}

export default UserController;