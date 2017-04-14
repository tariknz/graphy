import { NgModule } from '@angular/core';
import {
  MdCardModule, MdTabsModule, MdButtonModule,
  MdInputModule, MdToolbarModule, MdIconModule,
} from '@angular/material';

@NgModule({
  imports: [
    MdCardModule, MdTabsModule, MdButtonModule,
    MdInputModule, MdToolbarModule, MdIconModule
  ],
  exports: [
    MdCardModule, MdTabsModule, MdButtonModule,
    MdInputModule, MdToolbarModule, MdIconModule
  ],
  declarations: []
})
export class AppMaterialModule { }
