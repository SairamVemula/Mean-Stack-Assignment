import { AddItemComponent } from './dashboard/add-item/add-item.component';
import { DashContentComponent } from './dashboard/dash-content/dash-content.component';
import { ShareComponent } from './share/share.component';
import { ViewComponent } from './view/view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ForgetComponent } from './user/forget/forget.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: '/Login', pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },
      { path: 'Register', component: RegisterComponent },
      { path: 'ForgetPassword', component: ForgetComponent },
    ],
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashContentComponent, pathMatch: 'full' },
      { path: 'View', component: ViewComponent },
      { path: 'Add', component: AddItemComponent },
    ],
  },
  { path: 'View/:id', component: ViewComponent },
  { path: 'Share', component: ShareComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
