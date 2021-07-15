import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Admin/Components/dashboard/dashboard.component';
import { OrdersComponent } from './Admin/Components/orders/orders.component';
import { ProductsComponent } from './Admin/Components/products/products.component';
import { NavigationComponent } from './Admin/Main/navigation/navigation.component';
import { CartPageComponent } from './Customer/Components/cart-page/cart-page.component';
import { LandingComponent } from './Customer/Components/landing/landing.component';
import { LoginComponent } from './Customer/Components/login/login.component';
import { ProductSelectComponent } from './Customer/Components/product-select/product-select.component';
import { RegisterComponent } from './Customer/Components/register/register.component';

const routes: Routes = [
  {
    path: 'admin', component: NavigationComponent ,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'cart', component:CartPageComponent },
  { path: 'product', component:ProductSelectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
