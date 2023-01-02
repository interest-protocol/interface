export const hasKeys = <T>(keys: ReadonlyArray<string>, data: T): boolean =>
  keys.every(
    (key) => (data as Record<string | number, unknown>)[key] !== undefined
  );
