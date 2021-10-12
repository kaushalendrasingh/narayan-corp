import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { FrontService } from './../front.service';
import { AuthService } from './../auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontRoutingModule } from './front-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FrontComponent } from './front.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';
import { SalesComponent } from './sales/sales.component';
import { FInvoicesComponent } from './f-invoices/f-invoices.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPrintModule} from 'ngx-print';
import { FAddMedicineComponent } from './f-add-medicine/f-add-medicine.component';
import { FMedicineComponent } from './f-medicine/f-medicine.component';
import { AddRequirementComponent } from './add-requirement/add-requirement.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FrontComponent,
    SalesComponent,
    FInvoicesComponent,
    FAddMedicineComponent,
    FMedicineComponent,
    AddRequirementComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    NgxPrintModule
  ],
  providers:[
    AuthService,
    AuthGuard,
    FrontService
  ]
})
export class FrontModule { }
