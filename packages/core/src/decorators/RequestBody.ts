import { ROUTES_METADATA_KEY } from "./Request";


const RequestBody = () : (target: any, methodName: string, paramterIndex: number) => void => {
    return function(target: any, methodName: string, parameterIndex: number) {
        const existingRoutes =  Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            target,
        ) || [];

        let newRoutes = [...existingRoutes];
        
        const indexOfThisRoute = existingRoutes.findIndex(({ command }) => command === methodName);
        if (indexOfThisRoute > 0) {
            // if a method has been already registered.
            const thisRoute =  newRoutes[indexOfThisRoute];
            newRoutes[indexOfThisRoute] = {
                ...thisRoute,
                extractBody: {
                    parameterIndex,
                }
            };
        } else {
            newRoutes = [...existingRoutes, {
                extractBody: {
                    parameterIndex,
                },
                command: methodName,
            }];
        }
        
        console.log('New Routes are ', newRoutes);

        Reflect.defineMetadata(
            ROUTES_METADATA_KEY,
            newRoutes,
            target
        );
    };
};

export default RequestBody;