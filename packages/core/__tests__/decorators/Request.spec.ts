import Request, { ROUTES_METADATA_KEY } from "../../src/decorators/Request";


describe("@Request", () => {
    const options = {
        method: "GET",
        path: "/",
    };
    let decorate;

    const obj = { 
        getUser: () =>  { 
            return { message: "foo" };
        } 
    };
    beforeEach(() => {
        decorate = Request({
            ...options,
            method: "GET",
        });
        decorate(obj, "getUser");
    });

    afterEach(() => {
        decorate = null;
    });

    test("Should throw error when decorated method is not part of a class/object", () => {
        expect(() => decorate(null, "getUser")).toThrow(Error);
    });

    test("should 1 route meta data", () => {
        const existingRoutes = Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            obj
        ) || [];
        expect(existingRoutes.length).toBe(1);
    });

    test("Route metadata has correct method provided", () => {
        const existingRoutes = Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            obj
        ) || [];
        console.log(existingRoutes);
        const metadata = existingRoutes[0];
        expect(metadata.method).toBe(options.method);
    });

    test("Route metadata has correct path", () => {
        const existingRoutes = Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            obj
        ) || [];
        const metadata = existingRoutes[0];
        expect(metadata.path).toBe(options.path);
    });

    test("Route metadata has correct command", () => {
        const existingRoutes = Reflect.getMetadata(
            ROUTES_METADATA_KEY,
            obj
        ) || [];
        const metadata = existingRoutes[0];
        expect(metadata.command).toBe("getUser");
    });
});