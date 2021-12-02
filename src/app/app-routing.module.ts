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
import { AllOrdersComponent } from './Customer/Components/all-orders/all-orders.component';
import { LoginComponent } from './Customer/Components/login/login.component';
import { ShowProfileComponent } from './Customer/Components/show-profile/show-profile.component';
import { CheckOutComponent } from './Customer/Components/check-out/check-out.component';
import { ToPayComponent } from './Customer/Components/to-pay/to-pay.component';
import { DeliveryPageComponent } from './Customer/Components/delivery-page/delivery-page.component';
import { EditAccountComponent } from './Customer/Components/edit-account/edit-account.component';
import { MyOrderPageComponent } from './Customer/Components/my-order-page/my-order-page.component';
import { ProductSelectComponent } from './Customer/Components/product-select/product-select.component';
import { RegisterComponent } from './Customer/Components/register/register.component';
import { AddProductComponent } from './Admin/Components/products/add-product/add-product.component';
import { AddSaleComponent } from './Admin/Components/product-on-sale/add-sale/add-sale.component';
import { AddCategoryComponent } from './Admin/Components/category/add-category/add-category.component';
import { SearchResultComponent } from './Customer/Components/search-result/search-result.component';
import { EditProductComponent } from './Admin/Components/products/edit-product/edit-product.component';
import { EditAdminComponent } from './Admin/Components/admins/edit-admin/edit-admin.component';
import { EditCategoryComponent } from './Admin/Components/category/edit-category/edit-category.component';
import { ReceivedComponent } from './Customer/Components/received/received.component';
import { NotFoundPageComponent } from './NotFoundPage/not-found-page/not-found-page.component';
import { MyProfileComponent } from './Admin/Components/my-profile/my-profile.component';
import { EditSaleComponent } from './Admin/Components/product-on-sale/edit-sale/edit-sale.component';
import { LandingCategoryComponent } from './Customer/Components/landing-category/landing-category.component';
import { SpinnerComponent } from './Customer/Common/spinner/spinner.component';
import { ViewAllComponent } from './Customer/Components/view-all/view-all.component';
import { ResetPasswordComponent } from './Customer/Components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin', component: NavigationComponent , canActivate : [AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'myProfile', component: MyProfileComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'add-product', component: AddProductComponent},
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'add-admin', component: AddAdminComponent },
      { path: 'edit-admin/:id', component: EditAdminComponent },
      { path: 'pending-orders', component: PendingOrdersComponent },
      { path: 'product-on-sale', component: ProductOnSaleComponent },
      { path: 'add-sales', component: AddSaleComponent },
      { path: 'add-sales/:id', component: AddSaleComponent },
      { path: 'edit-sales/:id', component: EditSaleComponent },

      { path: 'categories', component:CategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'edit-category/:id', component: EditCategoryComponent }

    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'choose?=/:id', component: LandingCategoryComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'login', component:LoginComponent },
  { path: 'reset-password=?/:id',component:ResetPasswordComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: 'all-orders', component:AllOrdersComponent, canActivate: [CustomerGuard] },
  { path: 'cart', component:CartPageComponent, canActivate: [CustomerGuard] },
  { path: 'check-out', component:CheckOutComponent, canActivate: [CustomerGuard] },
  { path: 'delivery-page', component:DeliveryPageComponent, canActivate: [CustomerGuard] },
  { path: 'edit-account', component:EditAccountComponent, canActivate: [CustomerGuard] },
  { path: 'order-page', component:MyOrderPageComponent, canActivate: [CustomerGuard] },
  { path: 'product-select', component:ProductSelectComponent, canActivate: [CustomerGuard] },
  { path: 'received', component:ReceivedComponent, canActivate: [CustomerGuard]},
  { path: 'search-result', component:SearchResultComponent, canActivate: [CustomerGuard] },
  { path: 'show-profile', component:ShowProfileComponent, canActivate: [CustomerGuard] },
  { path: 'product', component:ProductSelectComponent, canActivate: [CustomerGuard] },
  { path: 'pay', component:ToPayComponent, canActivate: [CustomerGuard] },
  { path: 'selected/:id', component: ProductSelectComponent },
  { path: 'view=?/:id', component:ViewAllComponent },

  {path:'spinner',component:SpinnerComponent},

  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
