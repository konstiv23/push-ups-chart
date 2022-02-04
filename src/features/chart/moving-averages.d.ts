declare module "moving-averages" {
  export function ma(array: number[], period: number): number[];
  export function ema(array: number[], period: number): number[];
}
