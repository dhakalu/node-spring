import IEnvironment from "./IEnvironment";


interface IEnvironmentCapable {
    getEnvironment(): IEnvironment;
}

export default IEnvironmentCapable;