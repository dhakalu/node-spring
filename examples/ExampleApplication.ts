
import NodeSpringApplication from '../src/NodeSpringApplication';
import ExpressApplication from '../src/ExpressApplication';
import InjectArgument from '../src/InjectArgument';
import UserController from './controllers/UserController';
import 'reflect-metadata';

@ExpressApplication()
class Application  {

    @InjectArgument('NodeSpringApplication') nodeSpringApplication: NodeSpringApplication;

    // todo scan all the controllers automatically so we dont need to inject it manually
    @InjectArgument('UserController') userController: UserController;

    constructor(){
        // this.nodeSpringApplication.init();
        this.nodeSpringApplication.run();
    }

}


