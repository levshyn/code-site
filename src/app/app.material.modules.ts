import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdSidenavModule,
  MdIconModule,
  MdIconRegistry,
  MdToolbarModule } from '@angular/material';

@NgModule({
  imports: [ MdButtonModule, MdSidenavModule, MdIconModule,
    MdToolbarModule ],
  exports: [ MdButtonModule, MdSidenavModule, MdIconModule,
    MdToolbarModule ],
  providers: [ MdIconRegistry ]
})
export class MyMaterialModule { }
