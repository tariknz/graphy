export interface AxisOptions {
  type: AxisOptionsType;
  min: number;
  max: number;
  ticks: number;
}

export const enum AxisOptionsType {
  Number, DateTime,
};
