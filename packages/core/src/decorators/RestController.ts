import * as express from "express";
import { container } from "../Container";
import { ROUTES_METADATA_KEY } from "./Request";

export function RestController(path: string): (target: { new () }) => void {
    return function(target: { new () }): void {
        const existingRoutes =  Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            target,
        );      
        const newRoute = express.Router();
        existingRoutes.forEach(({ method, path, command, params = []}) => {     
            console.log("registering new route", { method, path, command, params });  
            switch(method) {
            case "GET": {
                newRoute.get(path, (req: express.Request, res: express.Response) => {
                    // todo right now this assumes that the method returns 
                    // json. we should update it to conditionally send response beased on the return type
                    const functionToCall = Reflect.get(target, command);
                    try {
                        // todo add parser to send body/requestparams/query params individually on the basis of need instead of sending the whole request object
                        const argsToPass = new Array(params.length);
                        for (const param of params) {
                            const {paramterIndex, parameterName} = param;
                            argsToPass[paramterIndex] = req.params[parameterName];
                        }
                        const response = functionToCall(...argsToPass);
                        res.json(response);
                    } catch(error) {
                        
                        res.status(500).json({
                            message: error.message,
                            name: error.name,
                            stack: error,
                        });
                    }
                });
                break;
            }
            case "POST": {
                newRoute.post(path, (req: express.Request, res: express.Response) => {
                    // todo right now this assumes that the method returns 
                    // json. we should update it to conditionally send response beased on the return type
                    const functionToCall = Reflect.get(target, command);
                    try {
                        // todo add parser to send body/requestparams/query params individually on the basis of need instead of sending the whole request object
                        const argsToPass = new Array(params.length);
                        for (const param of params) {
                            const {paramterIndex, parameterName} = param;
                            argsToPass[paramterIndex] = req.params[parameterName];
                        }
                        const response = functionToCall(...argsToPass);
                        res.json(response);
                    } catch(error) {
                        
                        res.status(500).json({
                            message: error.message,
                            name: error.name,
                            stack: error,
                        });
                    }
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