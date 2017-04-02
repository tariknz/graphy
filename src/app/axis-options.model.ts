export class AxisOptions {
  public min: number;
  public max: number;
  public ticks: number;
  public get interval(): number {
    return (this.max - this.min) / this.ticks;
  };
}
