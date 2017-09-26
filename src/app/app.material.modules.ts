import { NgModule } from '@angular/core';
// import { MdSidenavModule } from '@angular/material';
import {
  MdButtonModule,
  MdSidenavModule,
  MdIconModule,
  MdIconRegistry,
  MdToolbarModule } from '@angular/material';
// import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import { Ng2DropdownModule } from 'ng2-material-dropdown';

@NgModule({
  imports: [ MdButtonModule, MdSidenavModule, MdIconModule, MdToolbarModule, Ng2DropdownModule ],
  exports: [ MdButtonModule, MdSidenavModule, MdIconModule, MdToolbarModule, Ng2DropdownModule ],
  providers: [ MdIconRegistry ]
})
export class MyMaterialModule { }
