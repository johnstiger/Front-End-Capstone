import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { CartPageComponent } from './customer/components/cart-page/cart-page.component';
import { ProductSelectComponent } from './customer/components/product-select/product-select.component';
import { MyOrderPageComponent } from './customer/components/my-order-page/my-order-page.component';
import { EditAccountComponent } from './customer/components/edit-account/edit-account.component';



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
    EditAccountComponent
    
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
