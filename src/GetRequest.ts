

import { container } from './Container';
import 'reflect-metadata'

// todo move to central consts 
export const ROUTES_METADATA_KEY = "routes";

export function GetRequest(path: string) {
  return function(target: any, key: string) {
      const routeName = target?.constructor?.name;
      console.log('method target is', target);
      if (!routeName) {
           throw new Error('GetRequest annotation must be used with in a class.');
      }

      let existingRoutes = Reflect.getMetadata(
          ROUTES_METADATA_KEY,
          target
      ) || [];

      console.log('Existing routes are ', existingRoutes);


      const newRoutes = [...existingRoutes, {
          method: 'GET',
          path,
          command: key,
      }]

      Reflect.defineMetadata(
        ROUTES_METADATA_KEY,
        newRoutes,
        target
    );
  };
}

export default GetRequest;


