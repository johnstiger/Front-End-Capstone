import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Admin/Common/header/header.component';
import { FooterComponent } from './Admin/Common/footer/footer.component';
import { DashboardComponent } from './Admin/Components/dashboard/dashboard.component';
import { OrdersComponent } from './Admin/Components/orders/orders.component';
import { NavigationComponent } from './Admin/Main/navigation/navigation.component';
import { AuthHeaderComponent } from './Customer/Common/header/auth-header/auth-header.component';
import { GuestHeaderComponent } from './Customer/Common/header/guest-header/guest-header.component';
import { LandingComponent } from './Customer/Components/landing/landing.component';
import { RegisterComponent } from './Customer/Components/register/register.component';
import { CusFooterComponent } from './Customer/Common/cus-footer/cus-footer.component';
import { LoginComponent } from './Customer/Components/login/login.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './Admin/Components/table/table.component';
import { ProductsComponent } from './Admin/Components/products/products.component';
import { EditAccountComponent } from './Customer/Components/edit-account/edit-account.component';
import { CartPageComponent } from './Customer/Components/cart-page/cart-page.component';
import { ProductSelectComponent } from './Customer/Components/product-select/product-select.component';
import { MyOrderPageComponent } from './Customer/Components/my-order-page/my-order-page.component';
import { AllOrdersComponent } from './Customer/Components/all-orders/all-orders.component';
import { ReceivedComponent } from './Customer/Components/received/received.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToPayComponent } from './Customer/Components/to-pay/to-pay.component';
import { SampleHeaderComponent } from './Customer/Common/header/sample-header/sample-header.component';
import { CustomersComponent } from './Admin/Components/customers/customers.component';
import { AdminsComponent } from './Admin/Components/admins/admins.component';
import { PendingOrdersComponent } from './Admin/Components/pending-orders/pending-orders.component';
import { ProductOnSaleComponent } from './Admin/Components/product-on-sale/product-on-sale.component';
import { CategoryComponent } from './Admin/Components/category/category.component';
import { AddAdminComponent } from './Admin/Components/admins/add-admin/add-admin.component';
import { AddProductComponent } from './Admin/Components/products/add-product/add-product.component';
import { AddSaleComponent } from './Admin/Components/product-on-sale/add-sale/add-sale.component';
import { AddCategoryComponent } from './Admin/Components/category/add-category/add-category.component';
import { ShowProfileComponent } from './Customer/Components/show-profile/show-profile.component';
import { DeliveryPageComponent } from './Customer/Components/delivery-page/delivery-page.component';
import { SearchResultComponent } from './Customer/Components/search-result/search-result.component';
import { CongratsComponent } from './Customer/Components/congrats/congrats.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { EditProductComponent } from './Admin/Components/products/edit-product/edit-product.component';
import { EditAdminComponent } from './Admin/Components/admins/edit-admin/edit-admin.component';
import { EditCategoryComponent } from './Admin/Components/category/edit-category/edit-category.component';
import { NotFoundPageComponent } from './NotFoundPage/not-found-page/not-found-page.component';
import { MyProfileComponent } from './Admin/Components/my-profile/my-profile.component';
import { EditSaleComponent } from './Admin/Components/product-on-sale/edit-sale/edit-sale.component';
import { LandingCategoryComponent } from './Customer/Components/landing-category/landing-category.component';
import { ViewAllComponent } from './Customer/Components/view-all/view-all.component';
import { ResetPasswordComponent } from './Customer/Components/reset-password/reset-password.component';
import { AboutUsComponent } from './Customer/Components/about-us/about-us.component';
import { NewPasswordComponent } from './Customer/Components/new-password/new-password.component';
import { AddressesComponent } from './Customer/Components/addresses/addresses.component';
import { AddAddressesComponent } from './Customer/Components/add-addresses/add-addresses.component';
import { UpdateAddressComponent } from './Customer/Components/update-address/update-address.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    OrdersComponent,
    NavigationComponent,
    AuthHeaderComponent,
    GuestHeaderComponent,
    LandingComponent,
    RegisterComponent,
    CusFooterComponent,
    LoginComponent,
    CartPageComponent,
    ProductSelectComponent,
    MyOrderPageComponent,
    EditAccountComponent,
    TableComponent,
    ProductsComponent,
    AllOrdersComponent,
    ToPayComponent,
    ReceivedComponent,
    SampleHeaderComponent,
    CustomersComponent,
    AdminsComponent,
    PendingOrdersComponent,
    ProductOnSaleComponent,
    CategoryComponent,
    AddAdminComponent,
    AddProductComponent,
    AddSaleComponent,
    AddCategoryComponent,
    ShowProfileComponent,
    DeliveryPageComponent,
    SearchResultComponent,
    EditProductComponent,
    EditAdminComponent,
    EditCategoryComponent,
    NotFoundPageComponent,
    MyProfileComponent,
    EditSaleComponent,
    LandingCategoryComponent,
    ViewAllComponent,
    ResetPasswordComponent,
    AboutUsComponent,
    NewPasswordComponent,
    AddressesComponent,
    AddAddressesComponent,
    UpdateAddressComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    NgxPaginationModule,
    CollapseModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
