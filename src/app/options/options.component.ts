import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphOptions } from '../store/options/options.model';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.less']
})
export class OptionsComponent {

  @Input() public options: GraphOptions;
  @Output() public onOptionsUpdated = new EventEmitter<GraphOptions>();

  constructor() { }

  public submit(options: GraphOptions) {
    this.onOptionsUpdated.emit(options);
  }

}
