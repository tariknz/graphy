import { Component, ViewChild, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CanvasPos } from './store/canvas/canvas-pos.model';
import { AddPointAction } from './store/canvas/canvas.actions';
import { CanvasComponent } from './canvas/canvas.component';

import * as fromRoot from './store';
import { AddDataAction, ClearDataAction } from './store/data/data.actions';
import { AxisOptions } from './store/options/axis-options.model';
import { GraphOptions } from './store/options/options.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  @ViewChild(CanvasComponent) public canvas: CanvasComponent;

  public title = 'Graphy';
  public dataItems$: Observable<CanvasPos[]>;
  public options: GraphOptions;

  constructor(private store: Store<fromRoot.State>) {
    this.dataItems$ = store.select(fromRoot.getAllData);

    store.select(fromRoot.getOptions)
      .subscribe(options => this.options = options);
  }

  public ngOnInit() {
    this.canvas.onDraw
      .asObservable()
      .map(ratio => {
        return {
          x: (this.options.x.max - this.options.x.min) * ratio.x,
          y: (this.options.y.max - this.options.y.min) * ratio.y,
        };
      })
      .map((value) => {
        return {
          x: Math.round(value.x / this.options.x.interval) * this.options.x.interval,
          y: Math.round(value.y / this.options.y.interval) * this.options.y.interval,
        };
      })
      .distinct((value) => value.x)
      .subscribe(res => {
        this.store.dispatch(new AddDataAction(res));
      });
  }

  public clear() {
    this.store.dispatch(new ClearDataAction());
    this.canvas.clear();
  }
}
