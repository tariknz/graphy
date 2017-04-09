import {
  Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy,
  EventEmitter, Output, ElementRef, AfterViewInit, ViewChild, OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CanvasPos } from '../store/canvas/canvas-pos.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 400;
  @Input() public height = 400;

  /**
   * Returns current position
   *
   * @memberOf CanvasComponent
   */
  @Output() public onDraw = new EventEmitter<CanvasPos>();

  private canvasEl: HTMLCanvasElement;
  private cx: CanvasRenderingContext2D | null;
  private resizeSub: Subscription;

  constructor() { }

  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');

    if (!this.cx) {
      throw new Error('Fatal Error: Could not get canvas context');
    }

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.resizeCanvas();
    this.resizeSub = Observable
        .fromEvent(window, 'resize')
        .debounceTime(500)
        .subscribe(() => this.resizeCanvas());

    Observable
      .fromEvent(this.canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(this.canvasEl, 'mousemove')
          .takeUntil(Observable.fromEvent(this.canvasEl, 'mouseup'))
          .pairwise();
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = this.canvasEl.getBoundingClientRect();

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
  }

  public ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }

  public clear() {
    if (this.cx) {
      this.cx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    }
  }

  private drawOnCanvas(prevPos: CanvasPos, currentPos: CanvasPos) {
    if (!this.cx) { return; }

    const rect = this.canvasEl.getBoundingClientRect();

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

  private resizeCanvas() {
    this.canvasEl.width = this.canvasEl.offsetWidth;
    this.canvasEl.height = this.canvasEl.offsetHeight;
  }

}
