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
import { FormGroup, FormBuilder } from '@angular/forms';
import { SetOptionsAction } from './store/options/options.actions';
import { CsvExporter } from './common/exporter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  @ViewChild(CanvasComponent) public canvas: CanvasComponent;

  public title = 'Graphy';

  public dataItems$: Observable<CanvasPos[]>;
  public dataTotal$: Observable<number>;

  public options: GraphOptions;
  public optionsForm: FormGroup;

  constructor(
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
  ) {
    this.dataItems$ = store.select(fromRoot.getAllData);
    this.dataTotal$ = store.select(fromRoot.getTotalDataItems);

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
      .map((value) => this.getTranslatedValue(value, this.options))
      .distinct((value) => value.x)
      .subscribe(res => {
        this.store.dispatch(new AddDataAction(res));
      });

      this.initOptionsForm();
  }

  public clear() {
    this.store.dispatch(new ClearDataAction());
    this.canvas.clear();
  }

  public setOptions() {
    this.clear();
    this.store.dispatch(new SetOptionsAction(this.optionsForm.value));

  }

  public export() {
    this.store
      .select(fromRoot.getAllData)
      .first()
      .subscribe(data => {
        CsvExporter.export(data);
      });
  }

  private getTranslatedValue(value: { x: number, y: number }, options: GraphOptions): { x: number, y: number } {
    const intervalX = (options.x.max - options.x.min) / options.x.ticks;
    const intervalY = (options.y.max - options.y.min) / options.y.ticks;

    return {
      x: Math.round(value.x / intervalX) * intervalX,
      y: Math.round(value.y / intervalY) * intervalY,
    }
  }

  private initOptionsForm() {
    this.optionsForm = this.fb.group({
      x: this.fb.group({
        min: [],
        max: [],
        ticks: [],
      }),
      y: this.fb.group({
        min: [],
        max: [],
        ticks: [],
      }),
    });

    this.optionsForm.patchValue(this.options);
  }


}
