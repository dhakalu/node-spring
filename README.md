# Spring Node

This is a javascript library that provides similar functionality of SpringBoot. Read more about SpringBoot [here](https://spring.io/projects/spring-boot#learn).

This library can be used to create Restful APIs easily with decorative coding.

Features provided:

- Annotation based components creation (e.g `@RestController('/users')` )
- Dependency Injection (e.g. `@InjectArgument('beanName') someBean: TypeOfBean;`)

## Usage

### Creating an application

```ts
import Core from "@node-spring/core";
import UserController from "./controllers/UserController";
import "reflect-metadata";

const { ExpressApplication, InjectArgument } = Core;

@ExpressApplication()
class Application {
  @InjectArgument("NodeSpringApplication") nodeSpringApplication: any;

  // register all the controllers of our application
  @InjectArgument("UserController") userController: UserController;

  constructor() {
    this.nodeSpringApplication.run();
  }
}
```

### Defining New Routes

Routes can reginstered using `@RestController` class decorator. The methods inside of this controller can be decorated using method decorators. For example `@GetRequest` would create a get request. Request object can be extracted using `@RequestParams`, `@QueryParams` decorators. Complete example of a controller is shown below:

```ts
import Core from "@node-spring/core";

const {
  Component,
  InternalServerError,
  GetRequest,
  RequestParam,
  RestController,
} = Core;

@RestController("/users")
@Component({}) //todo make restcontroller automatically be component
class UserController {
  @GetRequest("/")
  static getUsers(req) {
    return {
      users: [
        {
          name: "upen dhakal",
          email: "dhakal.upenn@gmail.com",
        },
      ],
    };
  }

  @PostRequest("/")
  static createNewUser(@RequestBody() createUserRequestBody) {
    return createUserRequestBody;
  }
}

export default UserController;
```

#### Extracting Path Parameters

`@RequestParam` decorator can be used to extract path parameter from the request. Make sure the path has `:<some-path-key>` to be able to use this decorator.

For example for a route defined as `@GetRequest("/users/:userId")`, if user makes request to `/users/1234` and the method has an argument `@RequestParam("userId") userId`, the variable userId will have value of 1234.

Full example of a rquest extracting path parameter is:

```ts
 @GetRequest("/:userId")
  static getUser(@RequestParam("userId") userId: string) {
    console.log("Request parameter recieved is ", userId);
    return {
      name: "upen dhakal",
      userId,
      email: "dhakal.upenn@gmail.com",
    };
  }

```
