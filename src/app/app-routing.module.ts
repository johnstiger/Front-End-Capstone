import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './Admin/Components/admins/add-admin/add-admin.component';
import { AdminsComponent } from './Admin/Components/admins/admins.component';
import { CategoryComponent } from './Admin/Components/category/category.component';
import { CustomersComponent } from './Admin/Components/customers/customers.component';
import { DashboardComponent } from './Admin/Components/dashboard/dashboard.component';
import { OrdersComponent } from './Admin/Components/orders/orders.component';
import { PendingOrdersComponent } from './Admin/Components/pending-orders/pending-orders.component';
import { ProductOnSaleComponent } from './Admin/Components/product-on-sale/product-on-sale.component';
import { ProductsComponent } from './Admin/Components/products/products.component';
import { NavigationComponent } from './Admin/Main/navigation/navigation.component';
import { AdminGuard } from './Authorization/admin.guard';
import { CustomerGuard } from './Authorization/customer.guard';
import { CartPageComponent } from './Customer/Components/cart-page/cart-page.component';
import { LandingComponent } from './Customer/Components/landing/landing.component';
import { LoginComponent } from './Customer/Components/login/login.component';
import { ProductSelectComponent } from './Customer/Components/product-select/product-select.component';
import { RegisterComponent } from './Customer/Components/register/register.component';
import { AddProductComponent } from './Admin/Components/products/add-product/add-product.component';
import { AddSaleComponent } from './Admin/Components/product-on-sale/add-sale/add-sale.component';
import { AddCategoryComponent } from './Admin/Components/category/add-category/add-category.component';

const routes: Routes = [
  {
    path: 'admin', component: NavigationComponent , canActivate : [AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'add-product', component: AddProductComponent},
      { path: 'customers', component: CustomersComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'add-admin', component: AddAdminComponent },
      { path: 'pending-orders', component: PendingOrdersComponent },
      { path: 'product-on-sale', component: ProductOnSaleComponent },
      { path: 'add-sales', component: AddSaleComponent },
      { path: 'categories', component:CategoryComponent },
      { path: 'add-category', component: AddCategoryComponent }
    ],
  },
  {
    path: 'customer', component: NavigationComponent , canActivate: [CustomerGuard],
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'login', component:LoginComponent },
      { path: 'register', component:RegisterComponent },
      { path: 'cart', component:CartPageComponent },
      { path: 'product', component:ProductSelectComponent }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
