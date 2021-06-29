
import IBeanFactory from "./beans/factory/IBeanFactory";

/**
* This class holds all the beans/elements created using the decorations
*/
class Container implements IBeanFactory {
    components: Map<string, any>;  
    aliases: Map<string, string[]>;

    constructor() {
        this.components = new Map();
        this.aliases = new Map();
    }

    numberOfContainers() {
        return this.components.size;
    }

    containsBean(beanName: string): boolean {
        return this.components.has(beanName);
    }
    getAliases(beanName: string): string[] {
        if (!this.components.has(beanName)) {
            throw new Error(`Component with the key ${beanName} does not exist.`);
        }
        return this.aliases.get(beanName) || [];
    }
    getBean(beanName: string) {
        if (!this.containsBean(beanName)) {
            throw new Error(`Component with the key ${beanName} does not exist.`);
        }
        return this.components.get(beanName);
    }
    isProptotype(beanName: string): boolean {
        console.log(beanName);
        throw new Error("Method not implemented.");
    }
    isSingleton(beanName: string): boolean {
        if (!this.containsBean(beanName)) {
            throw new Error(`Component with the key ${beanName} does not exist.`);
        }
        return true;
    }

    addComponent(key: string, component: any) {
        if (this.containsBean(key)) {
            throw new Error(`Component with the key ${key} already exists.`);
        }
        this.components.set(key, component);
    }
}

export const container = new Container();