

import { container } from "./Container";

const InjectArgument = (token: string): (target: never, key: string) => void =>  {
    return function(target: never, key: string) {
        const objectToInject =  container.getBean(token);
        Object.defineProperty(target, key, {
            get: () => objectToInject,
            set: (newValue) => { key = newValue;},
            enumerable: true,
            configurable: true
        });
    };
};

export default InjectArgument;


