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
// import FlexLayoutModule for angular/flex
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavNavComponent } from './sidenav/sidenav-nav/sidenav-nav.component';
/* Import prism core */
import 'prismjs/prism';
/* Import the language you need to highlight */
import 'prismjs/components/prism-javascript';
import { PrismComponent } from 'angular-prism';
// import snippets service
import { SnippetService } from './services/snippet.service';
// import snippet model
import { SnippetModelService } from './services/snippet-model.service';
// import menu navigation service
import { MenuNavService } from './services/menu-nav.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TopMenuComponent,
    CodePagesComponent,
    SidenavComponent,
    SidenavNavComponent,
    PrismComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      AppRoutes /*,
      { enableTracing: true }*/ // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MyMaterialModule,
    FlexLayoutModule
  ],
  providers: [SnippetService, // Add the snippets service
    SnippetModelService, // Add the snippet model
    MenuNavService], // Add the menu navigation service
  bootstrap: [AppComponent]
})
export class AppModule { }
