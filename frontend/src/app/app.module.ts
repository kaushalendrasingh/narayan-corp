import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontViewComponent } from './front-view/front-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from "@angular/common/http";
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FrontViewComponent,
    PageNotFoundComponent,
    AdminLoginComponent,
    ForgetPasswordComponent,
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
