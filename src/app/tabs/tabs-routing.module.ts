import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'stores-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../stores-tab/stores-tab.module').then(m => m.StoresTabPageModule)
          }
        ]
      },
      {
        path: 'game-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../game-tab/game-tab.module').then(m => m.GameTabPageModule)
          }
        ]
      },
      {
        path: 'home-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home-tab/home-tab.module').then(m => m.HomeTabPageModule)
          }
        ]
      },
      {
        path: 'about-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../about-tab/about-tab.module').then(m => m.AboutTabPageModule)
          }
        ]
      },
      {
        path: 'contact-us-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../contact-us-tab/contact-us-tab.module').then(m => m.ContactUsTabPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
