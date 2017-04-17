import { CanvasPos } from '../store/canvas/canvas-pos.model';
import { GraphOptions } from '../store/options/options.model';
import { AxisOptions, AxisOptionsType } from '../store/options/axis-options.model';

export class CanvasToData {
  public static mapRatioToData(
    ratio: CanvasPos,
    options: GraphOptions,
  ): { x: number, y: number } {
    const convertedValue = {
      x: this.ratioToNumber(options.x, ratio.x),
      y: this.ratioToNumber(options.y, ratio.y),
    };
    return {
      x: this.roundToNearestInterval(convertedValue.x, this.getInterval(options.x)),
      y: this.roundToNearestInterval(convertedValue.y,  this.getInterval(options.y)),
    };
  }

  private static ratioToNumber(axis: AxisOptions, ratio: number): number {
      return ((axis.max - axis.min) * ratio) + axis.min;
  }

  private static getInterval(axis: AxisOptions): number {
    return (axis.max - axis.min) / axis.ticks;
  }

  private static roundToNearestInterval(value: number, interval: number): number {
    return Math.round(value / interval) * interval;
  }
}
