import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CodePagesComponent } from './code-pages/code-pages.component';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: AboutComponent
  },
  {
    path: 'code/:id',
    component: CodePagesComponent
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
