

import { container } from './Container';

export function InjectArgument(token: string) {
  return function(target: any, key: string) {
    let objectToInject =  container.getBean(token);
    Object.defineProperty(target, key, {
      get: () => objectToInject,
      set: (newValue) => { key = newValue},
      enumerable: true,
      configurable: true
    });
  };
}

export default InjectArgument;


