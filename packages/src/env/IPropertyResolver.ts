

interface IPropertyResolver {


    /**
     * Does the property with given key exists in this source?
     */
    containsProperty(key: string): boolean;

    /**
     * Get the property associated with the given key or null if the key cannot be resolved.
     * 
     * @param key String thet identifies the required property
     */
    getProperty(key: string): string | null;

     /**
     * Get the property associated with the given key or provided default value if the given key cannot be resolved.
     * 
     * @param key String thet identifies the required property
     */
    getProperty(key: string, defaultValue: string): string | null;
}

export default IPropertyResolver;