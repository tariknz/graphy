import {
  Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy,
  EventEmitter, Output, NgZone, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanvasPos } from '../store/canvas/canvas-pos.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 400;
  @Input() public height = 400;

  /**
   * Returns current position
   *
   * @memberOf CanvasComponent
   */
  @Output() public onDraw = new EventEmitter<CanvasPos>();

  private cx: CanvasRenderingContext2D;

  constructor(private zone: NgZone) { }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    Observable
      .fromEvent(canvasEl, 'mousedown')
      .subscribe((e) => {
        Observable
          .fromEvent(canvasEl, 'mousemove')
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          .pairwise()
          .subscribe((res: [MouseEvent, MouseEvent]) => {
            const rect = canvasEl.getBoundingClientRect();

            const prevPos: CanvasPos = {
              x: res[0].clientX - rect.left,
              y: res[0].clientY - rect.top
            };

            const currentPos: CanvasPos = {
              x: res[1].clientX - rect.left,
              y: res[1].clientY - rect.top
            };

            const percentOnScreen: CanvasPos = {
              x: currentPos.x / this.width,
              y: 1 - (currentPos.y / this.height)
            };

            this.onDraw.emit(percentOnScreen);
            this.drawOnCanvas(prevPos, currentPos);
          });
      });
  }

  private drawOnCanvas(prevPos: CanvasPos, currentPos: CanvasPos) {
    if (!this.cx) { return; }

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from

      this.cx.quadraticCurveTo(
        prevPos.x,
        prevPos.y,
        currentPos.x,
        currentPos.y);

      this.cx.closePath();
      this.cx.stroke();
    }

    return currentPos;
  }

}
