
import IBeanFactory from './beans/factory/IBeanFactory';
import Component from './Component';

// /**
//  * This class holds all the beans/elements created using the decorations
//  */
class Container implements IBeanFactory {
    components: Map<String, any>;  

    constructor() {
        this.components = new Map();
    }
    containsBean(beanName: string): boolean {
        throw new Error('Method not implemented.');
    }
    getAliases(beanName: string): String[] {
         if (!this.components.has(beanName)) {
            throw new Error(`Component with the key ${beanName} does not exist.`)
        }
        return this.components.get(beanName);
    }
    getBean(beanName: string) {
         if (!this.components.has(beanName)) {
            throw new Error(`Component with the key ${beanName} does not exist.`)
        }
        return this.components.get(beanName);
    }
    isProptotype(beanName: string): boolean {
        throw new Error('Method not implemented.');
    }
    isSingleton(beanName: string): boolean {
        throw new Error('Method not implemented.');
    }

    addComponent(key: string, component: any) {
        if (this.components.has(key)) {
            throw new Error(`Component with the key ${key} already exists.`)
        }
        this.components.set(key, component);
    }
}

// export default Container;


// import { find } from 'lodash';

// export class Container {
//   private _providers: { [key: string]: any } = {};

//   public resolve(token: string) {
//     const matchedProvider = this._providers[token]

//     if (matchedProvider) {
//       return matchedProvider;
//     } else {
//       throw new Error(`No provider found for ${token}!`);
//     }
//   }
// }

export const container = new Container();