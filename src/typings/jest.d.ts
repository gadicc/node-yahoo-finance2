export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      // jest-tobetype
      toBeType(type: string): R;
    }
  }
}
