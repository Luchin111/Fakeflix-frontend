import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { CitiesComponent } from './components/cities/cities.component';
import { NavbarComponent } from './_layout/navbar/navbar.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DetailComponent } from './components/detail/detail.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UsersComponent,
    CitiesComponent,
    NavbarComponent,
    FooterComponent,
    AppLayoutComponent,
    OrdersComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
