import { DashService } from './dash.service';
import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgetComponent } from './user/forget/forget.component';
import { PasswordCheckDirective } from './password-check.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashItemComponent } from './dashboard/dash-item/dash-item.component';
import { HoverDirective } from './hover.directive';
import { ViewComponent } from './view/view.component';
import { ShareComponent } from './share/share.component';
import { DashContentComponent } from './dashboard/dash-content/dash-content.component';
import { AddItemComponent } from './dashboard/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    PasswordCheckDirective,
    DashboardComponent,
    DashItemComponent,
    HoverDirective,
    ViewComponent,
    ShareComponent,
    DashContentComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthGuard, DashService],
  bootstrap: [AppComponent],
})
export class AppModule {}
