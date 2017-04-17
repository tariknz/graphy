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
import { CanvasToData } from './common/canvas-to-data';

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
  public options$: Observable<GraphOptions>;

  public options: GraphOptions;
  public optionsForm: FormGroup;

  constructor(
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
  ) {
    this.dataItems$ = store.select(fromRoot.getAllData);
    this.dataTotal$ = store.select(fromRoot.getTotalDataItems);
    this.options$ = store.select(fromRoot.getOptions);

    store.select(fromRoot.getOptions)
         .subscribe(options => this.options = options);
  }

  public ngOnInit() {
    this.canvas.onDraw
      .asObservable()
      .map(ratio => CanvasToData.mapRatioToData(ratio, this.options))
      .distinct((value) => value.x)
      .subscribe(res => {
        this.store.dispatch(new AddDataAction(res));
      });
  }

  public clear() {
    this.store.dispatch(new ClearDataAction());
    this.canvas.clear();
  }

  public setOptions(options: GraphOptions) {
    this.clear();
    this.store.dispatch(new SetOptionsAction(options));
  }

  public export() {
    this.store
      .select(fromRoot.getAllData)
      .first()
      .subscribe(data => {
        CsvExporter.export(data);
      });
  }
}
