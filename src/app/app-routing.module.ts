import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { CitiesComponent } from './components/cities/cities.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DetailComponent } from './components/detail/detail.component';
/*
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: '',
    component: CitiesComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'cities',
    component: CitiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: '',
    component: AppLayoutComponent, 
    children: [
      { path: 'cities', component: CitiesComponent },
      { path: 'users', component: UsersComponent },      
      { path: 'main', component: MainComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'detail/:id', component: DetailComponent }
    ]
    //,canActivate: [AuthGuard]
}
];


@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
