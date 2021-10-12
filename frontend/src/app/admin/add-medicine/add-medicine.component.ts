import { DataTablesModule } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent implements OnInit {
  typeItem: any;
  constructor(
    private adminService: AdminService,
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
  medicineTitle: string = 'Add Carpet';

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
      this.medicineTitle = 'Edit Carpet';
      this.adminService.getMedicineById(id).subscribe(
        (data) => {
          this.medicine = data;
          this.stock = this.medicine.data.totalStip;
          this.isAddMode = false;
          this.id = id;
        },
        (err) => {
          this.toastr.error(err.error.msg, 'Error', { timeOut: 3000 });
        }
      );
    } else {
      this.medicine.data = {
        mrp: null,
        sellingPrice: null,
        manufacturingDate: null,
        expiryDate: null,
        medicineCompany: null,
        medicineName: null,
        totalStip: null,
        medicineInStip: null,
        description: null,
        transportName: null,
      };
    }
  }
  onSubmit(): void {
    if (!this.isAddMode) {
      this.medicineValues = this.medicineData.value;
      const stock = this.stock + parseInt(this.medicineData.value.totalStip);
      this.medicineValues._id = this.id;
      this.medicineValues.totalStip = stock;
      this.adminService.updateMedicine(this.medicineValues).subscribe(
        (data) => {
          this.toastr.success('Carpet Updated Successfully', 'Success', {
            timeOut: 2000,
          });
          this.medicineData.reset();
        },
        (err) => {
          this.toastr.error(err.error.msg, 'Error', { timeOut: 3000 });
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

      this.adminService.addMedicine(addData).subscribe(
        (data) => {
          this.toastr.success('Carpet added Successfully', 'Success', {
            timeOut: 2000,
          });
          this.medicineData.reset();
        },
        (err) => {
          this.toastr.error(err.error.msg, 'Error', { timeOut: 3000 });
          this.medicineData.reset();
        }
      );
    }
  }
}
