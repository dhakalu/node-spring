import IPropertyResolver from "./IPropertyResolver";

/**
 * Interface that defines the environment in which the application is running.
 */
interface IEnvironment extends IPropertyResolver {
    
    /**
     * Return the set of profiles explicitly made active for this environment. Profiles are used for creating logical groupings of bean definitions to be registered conditionally, for example based on deployment environment. 
     * Profiles can be activated by setting "process.env.SPRING_ACTIVE_PROFILES" as a env property.
     */
    getActiveProfiles(): string[];
    /**
     * Return the set of profiles to be active by default when no active profiles have been set explicitly.
     */
    getDefaultProfiles(): string[];
}

export default IEnvironment;