import { Component, ViewChild, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CanvasPos } from './store/canvas/canvas-pos.model';
import { AddPointAction } from './store/canvas/canvas.actions';
import { CanvasComponent } from './canvas/canvas.component';

import * as fromRoot from './store';
import { AxisOptions } from './axis-options.model';
import { AddDataAction } from './store/data/data.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  @ViewChild(CanvasComponent) public canvas: CanvasComponent;

  public title = 'Graphy';
  public dataItems$: Observable<CanvasPos[]>;

  public xAxis = new AxisOptions();
  public yAxis = new AxisOptions();

  constructor(private store: Store<fromRoot.State>) {
    this.dataItems$ = store.select(fromRoot.getAllData);

    this.xAxis.min = 0;
    this.xAxis.max = 10000;
    this.xAxis.ticks = 1000;

    this.yAxis.min = 0;
    this.yAxis.max = 10000;
    this.yAxis.ticks = 1000;
  }

  public ngOnInit() {
    this.canvas.onDraw
      .asObservable()
      .map(ratio => {
        return {
          x: (this.xAxis.max - this.xAxis.min) * ratio.x,
          y: (this.yAxis.max - this.yAxis.min) * ratio.y,
        };
      })
      .map((value) => {
          return {
            x: Math.round(value.x / this.xAxis.interval) * this.xAxis.interval,
            y: Math.round(value.y / this.yAxis.interval) * this.yAxis.interval,
          };
      })
      .distinct((value) => value.x)
      .subscribe(res => {
        this.store.dispatch(new AddDataAction(res));
      });
  }
}
