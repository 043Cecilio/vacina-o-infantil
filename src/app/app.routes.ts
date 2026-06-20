import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'child-detail/:id', 
    loadComponent: () => import('./pages/child-detail/child-detail.page').then(m => m.ChildDetailPage)
  },
];