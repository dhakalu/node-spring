
import { ROUTES_METADATA_KEY } from "./Request";


const QueryParam = (parameterName?: string) : (target: any, methodName: string, paramterIndex: number) => void => {
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
            const existingQuery = thisRoute.query ? [...thisRoute.query] : [];

            newRoutes[indexOfThisRoute] = {
                ...thisRoute,
                query: [
                    ...existingQuery,
                    {
                        parameterName,
                        parameterIndex,
                    }
                ],
            };
        } else {
            newRoutes = [...existingRoutes, {
                query: [{
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

export default QueryParam;