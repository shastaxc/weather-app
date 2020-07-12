// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function valueExists(value: any): boolean {
  return value !== {} && value !== undefined && value !== null;
}
