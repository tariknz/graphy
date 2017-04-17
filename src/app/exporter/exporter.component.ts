import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataItem } from '../store/data/data-item.model';
import { CsvExporter } from './exporter';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExporterComponent {

  @Input() public data: DataItem[];

  constructor() { }

  public export() {
    CsvExporter.export(this.data);
  }

}
