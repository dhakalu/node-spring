

// todo move to central consts 
export const ROUTES_METADATA_KEY = "routes";


type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
}

export function Request({ method = "GET", path }: RequestOptions): (target: any, key: string) => void {
    return function(target: any, key: string): void {
        const routeName = target?.constructor?.name;
        if (!routeName) {
            throw new Error("Request annotation must be used with in a class.");
        }

        const existingRoutes = Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            target
        ) || [];



        const indexOfThisRoute = existingRoutes.findIndex(({ command }) => command === key);

        let newRoutes = [...existingRoutes];

        if (indexOfThisRoute > -1) {
            const thisRoute = newRoutes[indexOfThisRoute];
            newRoutes[indexOfThisRoute] = {
                ...thisRoute,
                method,
                path,
            };
        } else {
            newRoutes = [...existingRoutes, {
                method,
                path,
                command: key,
            }];
        }
        Reflect.defineMetadata(
            ROUTES_METADATA_KEY,
            newRoutes,
            target
        );
    };
}

export default Request;


