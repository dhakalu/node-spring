import { container } from "../Container";


type ComponentOptions = {
    prototype?: boolean;
    name?: string;
    aliases?: string[]
}

export function Component({ prototype = false, name }: ComponentOptions) {
    
    return function(target: { new () }): void {
        const beanName = name || target.name;
        const newObject = new target();
        if (prototype) {
            // todo if prototype is true return new instance everytime the componnet is requested 
            throw new Error("Prototype option is not yet implemented!");
        }
        container.addComponent(beanName, newObject);       
    };
}

export default Component;