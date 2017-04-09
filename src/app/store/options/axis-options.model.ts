export class AxisOptions {
  public get interval(): number {
    return (this.max - this.min) / this.ticks;
  };

  constructor(
    public min: number,
    public max: number,
    public ticks: number,
  ) { }
}
