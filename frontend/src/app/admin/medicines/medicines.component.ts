import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css'],
})
export class MedicinesComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  medicine: any = [];
  ngOnInit(): void {
    this.adminService.getMedicines().subscribe(
      (data) => {
        this.medicine = data;
        setTimeout(() => {
          $('#medicineTable').DataTable();
        }, 100);
      },
      (err) => {
        this.toastr.error(err.name, 'Error', { timeOut: 3000 });
      }
    );
  }

  editMedicine(id: string) {
    this.router.navigate([`/admin/medicine/${id}`]);
  }

  deleteMedicine(medicineId: string) {
    this.adminService.deleteMedicine(medicineId).subscribe(
      (data) => {
        this.router.navigate(['admin/dashboard']);
        this.toastr.success('Carpet deleted Successfully', 'Success', {
          timeOut: 3000,
        });
      },
      (err) => {
        this.router.navigate(['admin/dashboard']);
        this.toastr.error(err.name, 'Error', { timeOut: 3000 });
      }
    );
  }
}
