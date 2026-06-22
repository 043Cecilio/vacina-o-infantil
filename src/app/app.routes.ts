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
  {
    path: 'campaigns',
    loadComponent: () => import('./pages/campaigns/campaigns.page').then(m => m.CampaignsPage)
  },
  {
    path: 'register-child',
    loadComponent: () => import('./pages/register-child/register-child.page').then(m => m.RegisterChildPage)
  },
];