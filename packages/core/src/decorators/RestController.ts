import * as express from "express";
import { container } from "../Container";
import { ROUTES_METADATA_KEY } from "./Request";

type ParameterDetail = {
    parameterName?: string,
    parameterIndex: number,
}

type RouteMetadata = {
    method: "POST" | "GET" | "PUT" | "DELETE" | "OPTIONS",
    path: string,
    command: string,
    params: [ParameterDetail],
    query: [ParameterDetail],
    extractBody?: ParameterDetail,
}

const handleRequest = (functionToCall, routeDetail: RouteMetadata, req: express.Request, res: express.Response) => {
    
    const { params = [], query = [], extractBody } = routeDetail;
    
    try {
        // todo add parser to send body/requestparams/query params individually on the basis of need instead of sending the whole request object
                        
        let numberOfArgs = params.length + query.length;
        if (extractBody) {
            numberOfArgs += 1;
        }
        const argsToPass = new Array(numberOfArgs);
        for (const param of params) {
            const {parameterIndex, parameterName} = param;
            argsToPass[parameterIndex] = req.params[parameterName];
        }

        for (const q of query) {
            const {parameterIndex, parameterName} = q;
            argsToPass[parameterIndex] = req.query[parameterName];
        }

        if (extractBody) {
            argsToPass[extractBody.parameterIndex] = req.body;
        }
        console.log("args to pass", argsToPass);
        const response = functionToCall(...argsToPass);

        //todo by default response is json.. should we support more ways?
        res.status(200).json(response);
    } catch(error) {
        // todo by default we send 500.. should we support custom error? or should we throw the same error?            
        res.status(500).json({
            message: error.message,
            name: error.name,
            stack: error,
        });
    }
};

export function RestController(path: string): (target: { new () }) => void {
    return function(target: { new () }): void {
        const existingRoutes =  Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            target,
        ) || [];      
        const newRoute = express.Router();
        existingRoutes.forEach((routeDetail: RouteMetadata) => {     
            const { method, path, command } = routeDetail;
            const functionToCall = Reflect.get(target, command);
            
            switch(method) {
            case "GET": {
                newRoute.get(path, (req: express.Request, res: express.Response) => {
                    handleRequest(functionToCall, routeDetail, req, res);
                });
                break;
            }
            case "POST": {
                newRoute.post(path, (req: express.Request, res: express.Response) => {
                    handleRequest(functionToCall, routeDetail, req, res);
                });
                break;
            }
            default: {
                console.error("Methid is not supported just yet!");
                //   throw Error(`${method} is not supported just yet!`);
            }
            }
        });
        const app = container.getBean("app");
        app.use(path, newRoute);
    };
}

export default RestController;