import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CodePagesComponent } from './code-pages/code-pages.component';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: AboutComponent // ,
    // data: { title: 'About Me' }
  },
  {
    path: 'code',
    component: CodePagesComponent // ,
    // data: { title: 'Code' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  } // ,
  // { path: '**', component: PageNotFoundComponent }
];
