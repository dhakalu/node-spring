import { container } from "../src/Container";


describe("Container", () => {

    test("Components should be empty map when it initializes", () => {
        expect(container.numberOfContainers()).toBe(0);
    });

    class Car {
        name = "Nissan";
    }

    const configs = {
        beanName: "someName",
        component: new Car(),
    };

    describe("addComponent", () => {
        test("adds the component fine", () => {
            container.addComponent(configs.beanName, configs.component);
            expect(container.numberOfContainers()).toBe(1);
            expect(container.containsBean(configs.beanName));
        });

        test("Throws error when trying to add multiple beans with same name", () => {
            expect(() => container.addComponent(configs.beanName, "")).toThrow("Component with the key someName already exists.");
        });

    });

    describe("getBean", () => {

        test("Throws error when querying bean that does not exist", () => {
            const nonExistantBeanName = "noExist";
            expect(() => container.getBean(nonExistantBeanName)).toThrow(`Component with the key ${nonExistantBeanName} does not exist.`);
        });

        test("Returns a correct bean when bean exists in container", () => {
            const returnedBean = container.getBean(configs.beanName);
            expect(returnedBean instanceof Car).toBeTruthy();
            expect(returnedBean.name).toBe("Nissan");
        });

    });

    describe("isSingleton", () => {

        test("Throws error when querying singleton status of a bean that does not exist", () => {
            const nonExistantBeanName = "noExist";
            expect(() => container.isSingleton(nonExistantBeanName)).toThrow(`Component with the key ${nonExistantBeanName} does not exist.`);
        });

        test("By default added component should be singleton", () => {
            expect(container.isSingleton(configs.beanName)).toBeTruthy();
        });

    });

    describe("getAliases", () => {
        
        test("It should throw error when trying to query aliases of bean that does not exist", () => {
            const beanName = "noExist";
            expect(() => container.getAliases(beanName)).toThrow(`Component with the key ${beanName} does not exist.`);
        });
        
        test("It should return empty array when there are not aliases for a component", () => {
            const aliases = container.getAliases(configs.beanName);
            expect(aliases.length).toBe(0);
        });
    });

    describe("isProptotype", () => {
        
        test("It should throw error saying its not implemeneted", () => {
            const beanName = "noExist";
            expect(() => container.isProptotype(beanName)).toThrow("Method not implemented.");
        });
    });

});