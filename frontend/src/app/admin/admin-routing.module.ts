import { AdminAuthGuard } from './../admin-auth.guard';
import { AdminComponent } from './admin.component';
import { InvoicesComponent } from '../admin/invoices/invoices.component';
import { OptionsComponent } from './options/options.component';
import { UsersComponent } from './users/users.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path:"", component:AdminComponent,children:[
    {path:"dashboard",component:DashboardComponent, canActivate:[AdminAuthGuard]},
    {path:"add-agent",component:AddUserComponent, canActivate:[AdminAuthGuard]},
    {path:"agents",component:UsersComponent, canActivate:[AdminAuthGuard]},
    {path:"agents",component:UsersComponent, canActivate:[AdminAuthGuard]},
    {path:"agent/:id",component:AddUserComponent, canActivate:[AdminAuthGuard]},
    {path:"options",component:OptionsComponent, canActivate:[AdminAuthGuard]},
    {path:"invoices",component:InvoicesComponent, canActivate:[AdminAuthGuard]},
    {path:"add-medicine",component:AddMedicineComponent, canActivate:[AdminAuthGuard]},
    {path:"medicines",component:MedicinesComponent, canActivate:[AdminAuthGuard]},
    {path:"medicine/:id",component:AddMedicineComponent, canActivate:[AdminAuthGuard]}
  ], canActivateChild:[AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
