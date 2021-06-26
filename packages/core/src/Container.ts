
import IBeanFactory from "./beans/factory/IBeanFactory";

/**
* This class holds all the beans/elements created using the decorations
*/
class Container implements IBeanFactory {
    components: Map<string, any>;  

    constructor() {
        this.components = new Map();
    }
    containsBean(beanName: string): boolean {
        console.log(beanName);
        throw new Error("Method not implemented.");
    }
    getAliases(beanName: string): string[] {
        if (!this.components.has(beanName)) {
            throw new Error(`Component with the key ${beanName} does not exist.`);
        }
        return this.components.get(beanName);
    }
    getBean(beanName: string) {
        if (!this.components.has(beanName)) {
            throw new Error(`Component with the key ${beanName} does not exist.`);
        }
        return this.components.get(beanName);
    }
    isProptotype(beanName: string): boolean {
        console.log(beanName);
        throw new Error("Method not implemented.");
    }
    isSingleton(beanName: string): boolean {
        console.log(beanName);
        throw new Error("Method not implemented.");
    }

    addComponent(key: string, component: any) {
        if (this.components.has(key)) {
            throw new Error(`Component with the key ${key} already exists.`);
        }
        this.components.set(key, component);
    }
}

export const container = new Container();