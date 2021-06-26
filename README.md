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

Routes can reginstered using `@RestController` class decorator. The methods inside of a controller class can be decorated using different [request method decorators](#request-method-decorators). For example `@GetRequest` would create a get request.

Request object can be extracted using `@RequestParams`, `@QueryParams` decorators. Complete example of a controller is shown below:

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

#### Request method decorators

`@Request` method decorator can be used to mark a controller's method as a http request handler. This decorator can be used to make any type of http request.

More specific method decorators availavle are: `@GetRequest`, `@PostRequest` (More to add..).

#### Extracting Path Parameters

`@RequestParam` decorator can be used to extract path parameter from the request. Make sure the path has `:<some-path-key>` to be able to use this decorator.

For example for a route defined as `@GetRequest("/users/:userId")`, if user makes request to `/users/1234` and the method has an argument `@RequestParam("userId") userId`, the variable userId will have value of 1234.

Full example of a rquest extracting path parameter is:

```ts
@GetRequest("/:userId")
static getUser(@RequestParam("userId") userId: string) {
    console.log("Request parameter recieved is ", userId;
    return {
        name: "upen dhakal",
        userId,
        email: "dhakal.upenn@gmail.com",
    };
}

```

#### Extracting Query Parameters

Similar to Path Parameters, query parameters can be extracted with `@QueryParam` decorator as shown below:

```ts
@GetRequest("/:userId")
static getUser(@RequestParam("userId") userId: string, @QueryParam("postId") postId: string): User {
    console.log("Request parameter recieved is ", userId);
    console.log("Query parameter recieved is ", postId);
    return {
        name: "upen dhakal",
        userId,
        postId,
        email: "dhakal.upenn@gmail.com",
    };
}
```

making a get request to `users/1234?postId=abcd` would produce follwing in console:

```js
  Request parameter recieved is 1234
  Query parameter recieved is abcd
```

#### Extracting Request Body

`@RequestBody` decorator can be used to extract the `http` request's body as shown below:

```ts
@PostRequest("/")
static getUsersWithFilter(@RequestBody() parsedBody: object): { users: [User]}  {
    console.log(parsedBody)
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
```
