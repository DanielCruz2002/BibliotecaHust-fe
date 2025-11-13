import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout-component/dashboard-layout-component';
import { LoginLayoutComponent } from './layout/login-layout-component/login-layout-component';
import { PageLayoutComponent } from './layout/page-layout-component/page-layout-component';
import { LoginComponent } from './page/login/login-component/login-component';

export const routes: Routes = [
  {path:"dashboard", component: DashboardLayoutComponent},
  {
    path:"login",
    component: LoginLayoutComponent,
    children:[
      {path: "", component: LoginComponent}
    ]},
  {path:"page", component: PageLayoutComponent},
];
