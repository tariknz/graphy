import { Component, OnInit, Input } from '@angular/core';
import { DataItem } from '../store/data/data-item.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less']
})
export class DataTableComponent implements OnInit {

  @Input() public last = 10;
  @Input() public data: DataItem[];

  public get formattedData(): DataItem[] {
    return this.data.slice(Math.max(this.data.length - this.last, 1));
  }

  constructor() { }

  public ngOnInit() {

  }

}
