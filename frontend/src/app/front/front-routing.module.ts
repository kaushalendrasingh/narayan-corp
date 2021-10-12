import { FMedicineComponent } from './f-medicine/f-medicine.component';
import { FInvoicesComponent } from './f-invoices/f-invoices.component';
import { FAddMedicineComponent } from './f-add-medicine/f-add-medicine.component';
import { SalesComponent } from './sales/sales.component';
import { AuthGuard } from './../auth.guard';
import { FrontComponent } from './front.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRequirementComponent } from './add-requirement/add-requirement.component'

const routes : Routes = [
  {path:"", component:FrontComponent,children:[
    {path:"sales", component:SalesComponent, canActivate:[AuthGuard]},
    {path:"invoices", component:FInvoicesComponent, canActivate:[AuthGuard]},
    {path:"add-medicine", component:FAddMedicineComponent, canActivate:[AuthGuard]},
    {path:"medicines", component:FMedicineComponent, canActivate:[AuthGuard]},
    {path:"requirements", component:AddRequirementComponent, canActivate:[AuthGuard]},
    {path:"medicine/:id", component:FAddMedicineComponent, canActivate:[AuthGuard]}
  ], canActivateChild:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class FrontRoutingModule { }
