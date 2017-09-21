import { NgModule } from '@angular/core';
// import { MdSidenavModule } from '@angular/material';
import { MaterialModule } from '@angular/material';
// import {MdButtonModule, MdCheckboxModule} from '@angular/material';


@NgModule({
  imports: [/*MdSidenavModule, */MaterialModule],
  exports: [/*MdSidenavModule, */MaterialModule],
})
export class MyMaterialModule { }
