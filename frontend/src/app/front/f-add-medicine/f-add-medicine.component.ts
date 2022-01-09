import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontService } from './../../front.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-f-add-medicine',
  templateUrl: './f-add-medicine.component.html',
  styleUrls: ['./f-add-medicine.component.css'],
})
export class FAddMedicineComponent implements OnInit {
  type: any;
  typeItem: any;
  constructor(
    private frontService: FrontService,
    private toastr: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  medicineData = new FormGroup({
    medicineName: new FormControl('', [Validators.required]),
    sellingPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+(.[0-9][0-9]?)?'),
    ]),
    mrp: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+(.[0-9][0-9]?)?'),
    ]),
    medicineCompany: new FormControl('', [Validators.required]),
    totalStip: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+(.[0-9][0-9]?)?'),
    ]),
    medicineInStip: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+(.[0-9][0-9]?)?'),
    ]),
    type: new FormControl('', [Validators.required]),
  });

  medicine: any = {};
  isAddMode: boolean = true;
  medicineValues: any;
  id: string = '';
  stock: number = 0;
  dropdowntypeSetting: any = {
    singleSelection: true,
    idField: 'value',
    textField: 'name',
    itemsShowLimit: 10,
    allowSearchFilter: false,
  };

  isTypeList: any[] = [
    { id: 1, name: 'In meter', value: 'meter' },
    { id: 2, name: 'In stip', value: 'stip' },
  ];

  medicineTitle: string = 'Add Carpets';
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getMedicine(id);
  }

  get f() {
    return this.medicineData.controls;
  }

  isTypeListSelect(item: any) {
    this.typeItem = item;
  }

  getMedicine(id: string) {
    if (id) {
      this.medicineTitle = 'Edit Carpets';
      this.frontService.getMedicinesById(id).subscribe(
        (data: any) => {
          this.medicine = data.data;
          this.stock = this.medicine.totalStip;
          this.isAddMode = false;
          this.id = id;
          this.type = data.type;
        },
        (err) => {
          this.toastr.error(err.name, 'Error', { timeOut: 3000 });
        }
      );
    } else {
      this.medicine = {
        mrp: null,
        sellingPrice: null,
        medicineCompany: null,
        medicineName: null,
        totalStip: null,
        medicineInStip: null,
        type: null,
      };
    }
  }
  onSubmit(): void {
    if (!this.isAddMode) {
      this.medicineValues = this.medicineData.value;
      const stock = this.stock + parseInt(this.medicineData.value.totalStip);
      this.medicineValues._id = this.id;
      this.medicineValues.totalStip = this.typeItem.value === 'meter' ? 1 : stock;
      this.medicineValues.type = this.typeItem.value;
      this.frontService.updateMedicine(this.medicineValues).subscribe(
        (data) => {
          this.toastr.success('Carpets Updated Successfully', 'Success', {
            timeOut: 2000,
          });
          this.medicineData.reset();
        },
        (err) => {
          this.toastr.error(err.name, 'Error', { timeOut: 3000 });
          this.medicineData.reset();
        }
      );
    } else {
      const addData = {
        medicineCompany: this.medicineData.value.medicineCompany,
        medicineInStip: this.medicineData.value.medicineInStip,
        medicineName: this.medicineData.value.medicineName,
        mrp: this.medicineData.value.mrp,
        sellingPrice: this.medicineData.value.sellingPrice,
        totalStip: this.medicineData.value.totalStip,
        type: this.typeItem.value,
      };

      if (this.typeItem.value === 'meter') {
        addData.medicineInStip = 1;
      } else {
        addData.medicineInStip = this.medicineData.value.medicineInStip;
      }

      this.frontService.addMedicine(addData).subscribe(
        (data) => {
          this.toastr.success('Carpets added Successfully', 'Success', {
            timeOut: 2000,
          });
          this.medicineData.reset();
        },
        (err) => {
          this.toastr.error(err.name, 'Error', { timeOut: 3000 });
          this.medicineData.reset();
        }
      );
    }
  }
}
