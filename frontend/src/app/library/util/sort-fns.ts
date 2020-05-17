/**
 * Sorts most recent date first.
 */
export function sortByDateCreated(a: any, b: any): 1 | 0 | -1 {
  if (a.dateCreated < b.dateCreated) {
    return 1;
  }
  if (a.dateCreated === b.dateCreated) {
    return 0;
  }
  return -1;
}
