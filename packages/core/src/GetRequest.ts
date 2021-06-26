

import { container } from './Container';
import 'reflect-metadata'

// todo move to central consts 
export const ROUTES_METADATA_KEY = "routes";

export function GetRequest(path: string) {
  return function(target: any, key: string) {
      const routeName = target?.constructor?.name;
      if (!routeName) {
           throw new Error('GetRequest annotation must be used with in a class.');
      }

      let existingRoutes = Reflect.getMetadata(
          ROUTES_METADATA_KEY,
          target
      ) || [];


       const indexOfThisRoute = existingRoutes.findIndex(({ command }) => command === key);

       let newRoutes = [...existingRoutes];

        if (indexOfThisRoute > 0) {
            const thisRoute = newRoutes[indexOfThisRoute];
            newRoutes[indexOfThisRoute] = {
              ...thisRoute,
              method: 'GET',
              path,
            }
        } else {
          newRoutes = [...existingRoutes, {
                    method: 'GET',
                    path,
                    command: key,
            }]
        }
      Reflect.defineMetadata(
        ROUTES_METADATA_KEY,
        newRoutes,
        target
    );
  };
}

export default GetRequest;


