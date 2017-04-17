import { CanvasPos } from '../store/canvas/canvas-pos.model';
import { GraphOptions } from '../store/options/options.model';

export class CanvasToData {
  public static mapRatioToData(
    ratio: CanvasPos,
    options: GraphOptions,
  ): { x: number, y: number } {
    const convertedValue = {
      x: ((options.x.max - options.x.min) * ratio.x) + options.x.min,
      y: ((options.y.max - options.y.min) * ratio.y) + options.y.min,
    };

    const intervalX = (options.x.max - options.x.min) / options.x.ticks;
    const intervalY = (options.y.max - options.y.min) / options.y.ticks;

    return {
      x: Math.round(convertedValue.x / intervalX) * intervalX,
      y: Math.round(convertedValue.y / intervalY) * intervalY,
    };
  }
}
