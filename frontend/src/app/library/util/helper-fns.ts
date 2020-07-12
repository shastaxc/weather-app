export function valueExists(value: any): boolean {
  return value !== {} && value !== undefined && value !== null;
}

export function capitalizeFirst(str: string): string {
  return str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}
