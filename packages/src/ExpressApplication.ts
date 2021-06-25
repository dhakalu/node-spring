
export function ExpressApplication(): Function {
  return function(target: { new () }): void {
      new target();
  };
}

export default ExpressApplication;