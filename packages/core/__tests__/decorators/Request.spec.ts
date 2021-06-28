import Request, { ROUTES_METADATA_KEY } from "../../src/decorators/Request";


describe("@Request", () => {
    const getOptions = {
        method: "GET",
        path: "/",
    };

    const postOptions = {
        method: "POST",
        path: "/",
    };
    let existingRoutes;

    describe("Single decorated method", () => {
        const obj = { 
            getUser: () =>  { 
                return { message: "foo" };
            } 
        };
        beforeEach(() => {
            const decorate = Request({
                ...getOptions,
            });
            decorate(obj, "getUser");
            existingRoutes = Reflect.getMetadata(
                ROUTES_METADATA_KEY,
                obj
            ) || [];
        });


        test("Should throw error when decorated method is not part of a class/object", () => {
            const decorate = Request({
                ...getOptions,
            });
            expect(() => decorate(null, "getUser")).toThrow(Error);
        });

        test("should 1 route meta data", () => {
            expect(existingRoutes.length).toBe(1);
        });

        test("Route metadata has correct method provided", () => {
            const metadata = existingRoutes[0];
            expect(metadata.method).toBe(getOptions.method);
        });

        test("Route metadata has correct path", () => {
            const metadata = existingRoutes[0];
            expect(metadata.path).toBe(getOptions.path);
        });

        test("Route metadata has correct command", () => {
            const metadata = existingRoutes[0];
            expect(metadata.command).toBe("getUser");
        });
    });

    describe("Multiple decorated methods(2)", () => {
        const obj = { 
            getUser: () =>  { 
                return { message: "foo" };
            } 
        };
        beforeEach(() => {
            const decorate1 = Request({
                ...getOptions,
            });
            const decorate2 = Request({
                ...postOptions,
            });
            decorate1(obj, "getUser");
            decorate2(obj, "createUser");
            existingRoutes = Reflect.getMetadata(
                ROUTES_METADATA_KEY,
                obj
            ) || [];
        });


        test("Should throw error when decorated method is not part of a class/object", () => {
            const decorate = Request({
                ...getOptions,
                method: "GET",
            });
            expect(() => decorate(null, "getUser")).toThrow(Error);
        });

        test("should 2 route meta data", () => {
            expect(existingRoutes.length).toBe(2);
        });

        test("Route metadata has correct method provided", () => {
            const metadata1 = existingRoutes[0];
            const metadata2 = existingRoutes[1];
            expect(metadata1.method).toBe(getOptions.method);
            expect(metadata2.method).toBe(postOptions.method);
        });

        test("Route metadata has correct path", () => {
            const metadata1 = existingRoutes[0];
            const metadata2 = existingRoutes[1];
            expect(metadata1.path).toBe(getOptions.path);
            expect(metadata2.path).toBe(postOptions.path);
        });

        test("Route metadata has correct command", () => {
            const metadata1 = existingRoutes[0];
            const metadata2 = existingRoutes[1];
            expect(metadata1.command).toBe("getUser");
            expect(metadata2.command).toBe("createUser");
        });
    });
});