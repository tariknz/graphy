import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { DataItem } from '../store/data/data-item.model';
import { single, multi } from './data';
import { Observable } from 'rxjs/Observable';
import { GraphData } from './graph-data.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnChanges {
  @Input() public data: DataItem[];

  // todo: responsive width
  public view: any[] = [900, 400];
  public autoScale = true;
  public colorScheme = { domain: ['#673ab7'] };

  public graphData: GraphData[];

  public onSelect(event: any) {
    console.log(event);
  }

  public ngOnChanges() {
    this.graphData = [{
      name: 'Value',
      series: this.data.map(point => ({ name: point.x, value: point.y })),
    }];
  }
}
