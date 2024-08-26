/* eslint-disable @typescript-eslint/no-explicit-any */
export function flattenDeep<T>(arr: any[]): T[] {
  return arr.reduce((acc: T[], val: any) => {
    if (Array.isArray(val)) {
      acc.push(...flattenDeep<T>(val)); // Recursive case
    } else {
      acc.push(val); // Base case
    }
    return acc;
  }, []);
}
