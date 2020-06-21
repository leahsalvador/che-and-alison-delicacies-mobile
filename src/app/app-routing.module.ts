import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-search',
    loadChildren: () => import('./pages/product-search/product-search.module').then( m => m.ProductSearchPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'order-products',
    loadChildren: () => import('./pages/modal/order-products/order-products.module').then( m => m.OrderProductsPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/modal/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'map-marker',
    loadChildren: () => import('./pages/modal/map-marker/map-marker.module').then( m => m.MapMarkerPageModule)
  },
  {
    path: 'reward-points-history',
    loadChildren: () => import('./core/pages/reward-points-history/reward-points-history.module').then( m => m.RewardPointsHistoryPageModule)
  },
  {
    path: 'company-profile',
    loadChildren: () => import('./core/pages/company-profile/company-profile.module').then( m => m.CompanyProfilePageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./pages/policy/policy.module').then( m => m.PolicyPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
