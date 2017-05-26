import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CodePagesComponent } from './code-pages/code-pages.component';
import { AppRoutes } from './app.routes';
// import Material Design components
import { MyMaterialModule } from './app.material.modules';
// Load hammerJS
import 'hammerjs';

// import directive for highlight of code in html
import { HighlightCodeDirective } from './code-pages/code-pages.directives';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavNavComponent } from './sidenav/sidenav-nav/sidenav-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TopMenuComponent,
    CodePagesComponent,
    HighlightCodeDirective,
    SidenavComponent,
    SidenavNavComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    MyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
