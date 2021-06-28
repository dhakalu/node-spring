import { container } from "../../src/Container";
import Component from "../../src/decorators/Component";



class TestClass {
    
}

describe("@Component", () => {

    describe("Before Decoration", () => {
        test("Container should not contain the bean if its not decorated", () => {
            expect(() => container.getBean("TestClass")).toThrow("Component with the key TestClass does not exist.");
        });
    });

    describe("After Decoration", () => {
        const decorate =  Component({});
        test("it should add an item to the container", () => {
            decorate(TestClass);
            const cls = container.getBean("TestClass");
            expect(cls).toBeDefined();
        });

        test("Bean in container should be an instance of decorated class", () => {
            const cls = container.getBean("TestClass");
            expect(cls instanceof TestClass).toBeTruthy();
        });

        test("Decorating multiple classes with same name should throw error", () => {
            expect(() => decorate(TestClass)).toThrow("Component with the key TestClass already exists.");
        });

        test("Decorating with custom name should return a bean", () => {
            const customName = "customBeanName";
            const decorate2 = Component({
                name: customName,
            });
            decorate2(TestClass);
            const newBean = container.getBean(customName);
            expect(newBean).toBeDefined();
            expect(newBean instanceof TestClass).toBeTruthy();
        });

        test("Decorating with prototype should throw error", () => {
            const customName = "customBeanName2";
            const decorate2 = Component({
                name: customName,
                prototype: true,
            });
            expect(() => decorate2(TestClass)).toThrow("Prototype option is not yet implemented!");
            expect(() => container.getBean(customName)).toThrow("Component with the key customBeanName2 does not exist.");
        });
    });

    
});