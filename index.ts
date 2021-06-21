import Component from "./src/Component";
import InjectArgument from "./src/InjectArgument";
import 'reflect-metadata';

@Component({})
class UserRepo {
    name: string = "Hey";

    setName = (newName: string) => {
        this.name = newName;
    }
}

@Component({})
class UserService {

    @InjectArgument('UserRepo') repo: UserRepo;

    constructor() {
        console.log(this.repo);
        this.repo.setName('Updated Name from User Service')
    };
}

@Component({})
class UserController {

    @InjectArgument('UserRepo') repo: UserRepo;

    constructor() {
        console.log(this.repo);
    };
}

export default UserService;