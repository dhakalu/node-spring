
// const Component = (targetClass: Function, ...args: any[]) => {
//      const beanName = targetClass.name;
//     console.log('args', args);
//     const original = targetClass;
//     const newObject = Reflect.construct(original, args);
//     //todo check if the container contains the Bean with beanName

//     console.log('New object craeted', newObject);
// }

import { container } from './Container'


type ComponentOptions = {
    prototype?: boolean;
    name?: string;
    aliases?: string[]
}

export function Component({ prototype = false, name }: ComponentOptions): Function {
  return function(target: { new () }): void {
      const beanName = name || target.name;
      const newObject = new target();
      if (prototype) {
          // todo if prototype is true return new instance everytime the componnet is requested 
      }
      container.addComponent(beanName, newObject);
      console.log('Created a new component with name', beanName);
  };
}

export default Component;