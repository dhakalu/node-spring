import { ROUTES_METADATA_KEY } from "./Request";


const RequestParam = (parameterName?: string) : (target: any, methodName: string, paramterIndex: number) => void => {
    return function(target: any, methodName: string, parameterIndex: number) {
        const existingRoutes =  Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            target,
        ) || [];

        let newRoutes = [...existingRoutes];
        
        const indexOfThisRoute = existingRoutes.findIndex(({ command }) => command === methodName);
        if (indexOfThisRoute > 0) {
            // if a method has multiple request params or query params
            const thisRoute =  newRoutes[indexOfThisRoute];
            newRoutes[indexOfThisRoute] = {
                ...thisRoute,
                params: [
                    ...thisRoute.params,
                    {
                        parameterName,
                        parameterIndex,
                    }
                ],
            };
        } else {
            newRoutes = [...existingRoutes, {
                params: [{
                    parameterName,
                    parameterIndex,
                }],
                command: methodName,
            }];
        }
        

        Reflect.defineMetadata(
            ROUTES_METADATA_KEY,
            newRoutes,
            target
        );
    };
};

export default RequestParam;