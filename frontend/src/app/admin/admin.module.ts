import { ToastrModule } from 'ngx-toastr';
import { AdminAuthGuard } from './../admin-auth.guard';
import { AuthService } from './../auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarMenusComponent } from './sidebar-menus/sidebar-menus.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { OptionsComponent } from './options/options.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AdminService } from '../admin.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarMenusComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AddUserComponent,
    UsersComponent,
    AddMedicineComponent,
    MedicinesComponent,
    AdminComponent,
    OptionsComponent,
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    NgxPrintModule,
  ],
  providers: [AuthService, AdminAuthGuard, AdminService],
})
export class AdminModule {}
