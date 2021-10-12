import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontService } from './../../front.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-f-medicine',
  templateUrl: './f-medicine.component.html',
  styleUrls: ['./f-medicine.component.css']
})
export class FMedicineComponent implements OnInit {

  constructor(
    private frontService: FrontService,
    private toastr: ToastrService,
    private router : Router)
     { }

  medicine: any = [];
  ngOnInit(): void {
    this.frontService.getMedicines().subscribe((data)=>{
      this.medicine = data;
      setTimeout(()=>{
        $("#medicineTable").DataTable();
      },100)
    },(err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000})
    })
  }

  editMedicine(id:string){
    this.router.navigate([`/medicine/${id}`]);
  }
}
