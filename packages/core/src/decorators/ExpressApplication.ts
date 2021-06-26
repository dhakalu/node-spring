
export function ExpressApplication() {
    return function(target: { new () }): void {
        new target();
    };
}

export default ExpressApplication;