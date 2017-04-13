import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataItem } from '../store/data/data-item.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit {

  @Input() public data: DataItem[];

  constructor() { }

  public ngOnInit() {
  }

}
