import Core from "@tentorium/core";
import UserController from "./controllers/UserController";
import "reflect-metadata";

const {
    ExpressApplication,
    InjectArgument
} = Core;


@ExpressApplication()
class Application  {

    @InjectArgument("NodeSpringApplication") nodeSpringApplication: any;

    // todo scan all the controllers automatically so we dont need to inject it manually
    @InjectArgument("UserController") userController: UserController;

    constructor(){
        // this.nodeSpringApplication.init();
        this.nodeSpringApplication.run();
    }

}

export default Application;


