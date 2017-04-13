import { NgModule } from '@angular/core';
import { MdCardModule, MdTabsModule, MdButtonModule, MdInputModule, MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MdCardModule, MdTabsModule, MdButtonModule, MdInputModule, MdToolbarModule
  ],
  exports: [
    MdCardModule, MdTabsModule, MdButtonModule, MdInputModule, MdToolbarModule
  ],
  declarations: []
})
export class AppMaterialModule { }
