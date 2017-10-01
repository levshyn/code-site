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
    path: 'code/:id',
    component: CodePagesComponent // ,
    // data: { title: 'Code' }
  },
  {
    path: 'code',
    component: CodePagesComponent // ,    
    // redirectTo: '/code/1.1.0.1' // ,
    // pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo: '/home' // ,
    // pathMatch: 'full'
  } // ,
  // { path: '**', component: PageNotFoundComponent }
];
