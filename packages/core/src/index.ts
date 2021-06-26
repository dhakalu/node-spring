import NodeExpressApplication from "./NodeSpringApplication";
import ExpressApplication from "./decorators/ExpressApplication";
import InjectArgument from "./decorators/InjectArgument";
import Component from "./decorators/Component";
import InternalServerError from "./errors/InternalServerError";
import GetRequest from "./decorators/GetRequest";
import PostRequest from "./decorators/PostRequest";
import RequestParam from "./decorators/RequestParam";
import RestController from "./decorators/RestController";

//todo export from different sub modules
export default {
    NodeExpressApplication,
    ExpressApplication,
    InjectArgument,
    Component,
    InternalServerError,
    GetRequest,
    PostRequest,
    RequestParam,
    RestController,
};