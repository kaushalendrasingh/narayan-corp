import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontService } from './../../front.service';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  paidItem: any;
  constructor(
    private frontService: FrontService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  get f() {
    return this.medicineData.controls;
  }
  total: number = 0;
  buttondisable: boolean = true;
  dropdownList: any[] = [];
  isPaidList: any[] = [
    { id: 1, name: 'paid', value: true },
    { id: 2, name: 'unpaid', value: false },
  ];

  dropdownPaidSetting = {
    singleSelection: true,
    idField: 'value',
    textField: 'name',
    itemsShowLimit: 10,
    allowSearchFilter: false,
  };

  templist: any[] = [];
  cartItems: any = [];
  selectedItem: any = {};
  dropdownSettings: IDropdownSettings = {};
  item: any = {};
  totalmed: number = 0;

  medicineData = new FormGroup({
    quantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    medicineName: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    doctorName: new FormControl('', [Validators.required]),
    transportName: new FormControl('', [Validators.required]),
    transportDetails: new FormControl('', [Validators.required]),
    isPaid: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.prepareDropdown();
  }

  prepareDropdown() {
    this.frontService.getMedicinesForSales().subscribe(
      (values: any) => {
        const { data } = values;
        if (data) {
          for (let i = 0; i < data.length; i++) {
            this.templist.push({ id: data[i]._id, name: data[i].medicineName });
            this.dropdownList = this.templist;
          }
        } else {
          this.toastr.success('No Available Stock', 'Expired', {
            timeOut: 3000,
          });
        }
      },
      (err) => {
        this.toastr.error(err.name, 'Error', { timeOut: 3000 });
      }
    );
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    this.selectedItem = item;
  }

  isPaidListSelect(item: any) {
    this.paidItem = item;
  }

  onClick(quantity: string) {
    this.frontService.getMedicinesById(this.selectedItem.id).subscribe(
      (res: any) => {
        const { data } = res;
        this.buttondisable = false;
        const quan = parseInt(quantity);
        this.totalmed = data.medicineInStip * data.totalStip;
        if (quan > this.totalmed) {
          alert(`Please try to add below ${this.totalmed} `);
          return false;
        }
        const price = (data.sellingPrice / data.medicineInStip) * quan;
        const mrpPrice = (data.mrp / data.medicineInStip) * quan;
        const totalDiscount = mrpPrice - price;
        const disTotal = totalDiscount.toFixed(2);
        this.total += price;
        const reaPrice = price.toFixed(2);
        const catValue = {
          _id: data._id,
          medicineName: data.medicineName,
          mrp: parseFloat(data.mrp),
          priceDiscount: parseFloat(disTotal),
          quantity: quan,
          price: parseFloat(reaPrice),
        };
        this.cartItems.push(catValue);
      },
      (err) => {
        this.toastr.error(err.name, 'Error', { timeOut: 2000 });
      }
    );
  }

  onSubmit() {
    const sure = confirm('Are you sure want to sale ?');
    if (sure) {
      const customerName = this.medicineData.value.customerName;
      const doctorName = this.medicineData.value.doctorName;
      const transportName = this.medicineData.value.transportName;
      const transportDetails = this.medicineData.value.transportDetails;
      const isPaid = this.paidItem.value;
      const total = this.total.toFixed(2);
      const invoicesValues = {
        customerName: customerName,
        doctorName: doctorName,
        transportName: transportName,
        transportDetails: transportDetails,
        isPaid: isPaid,
        medicines: this.cartItems,
        totalPrice: parseFloat(total),
      };
      this.frontService.madeSale(invoicesValues).subscribe(
        (data: any) => {
          this.toastr.success('Sale Made Sucessfully', 'Success', {
            timeOut: 2000,
          });
          this.medicineData.reset();
          this.cartItems = [];
          this.buttondisable = true;
          this.total = 0;
          this.prepareDropdown();
          this.medicineData.reset();
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.name, 'Error', { timeOut: 2000 });
        }
      );
    }
  }

  deleteMedicine(id: string) {
    const temp = [];
    if (this.cartItems.length > 0) {
      for (let i = 0; i < this.cartItems.length; i++) {
        console.log(this.cartItems[i]._id);
        if (id !== this.cartItems[i]._id) {
          temp.push(this.cartItems[i]);
        } else {
          this.total = this.total - this.cartItems[i].price;
        }
      }
      this.cartItems = temp;
    } else {
      this.cartItems = [];
      this.buttondisable = true;
    }
    if (this.cartItems.length == 0) {
      this.buttondisable = true;
    }
  }
}
