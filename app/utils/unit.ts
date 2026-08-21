export function convertTemp(celsius: number, isImperial: boolean): number {
  return isImperial ? Math.round((celsius * 9) / 5 + 32) : celsius;
}

export function convertWind(mps: number, isImperial: boolean): number {
  return isImperial ? Number((mps * 2.23694).toFixed(1)) : mps;
}
