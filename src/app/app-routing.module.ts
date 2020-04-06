import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-catalog',
    loadChildren: () => import('./home/product-catalog/product-catalog.module').then( m => m.ProductCatalogPageModule)
  },
  {
    path: 'color-collections',
    loadChildren: () => import('./home/color-collections/color-collections.module').then( m => m.ColorCollectionsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
