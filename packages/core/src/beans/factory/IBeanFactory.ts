/**
 * Provides advanced cofiguration capabale of managing any type of object
 * 
 * Bean is a object is instantiated, assembled, and managed by a Node Spring IoC container
 */
interface IBeanFactory {
    /**
     * Does the IoC container conatins a Bean with given name. 
     */
    containsBean(beanName: string): boolean;
    /**
     * 
     * A bean is usually identified by its name. But it can also conatin some aliases that can identify the bean.
     * @param beanName Name of the bean by which the bean is identififed.
     */
    getAliases(beanName: string): string[]

    /**
     * Returns an instance of the specified bean
     * 
     * @param beanName Name of the bean by which the bean is identified. Returned bean could be a shared bean (singleton) or 
     * indendent.
     */
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    getBean(beanName: string) : any;

    /**
     * Is the Bean with given name independent or singleton? true -> independent, false -> singleton
     * 
     * @param beanName Name of the bean
     */
    isProptotype(beanName: string): boolean

    /**
     * Is the bean with given name singleton? Singleton bean always returns the same instance all the time.
     * 
     * @param beanName Name of the bean
     */
    isSingleton(beanName: string): boolean
}

export default IBeanFactory;