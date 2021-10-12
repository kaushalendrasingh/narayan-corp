import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private adminService : AdminService, private toastr: ToastrService, private router : Router) { }
  dashboard : any ={};

  ngOnInit(): void {
    this.adminService.getDashBoardData().subscribe((data :any)=>{
      this.dashboard = data.data;

    },
    (err)=>{
      if(err){
        localStorage.removeItem('adminAuthToken');
        this.router.navigate(['/admin'])
      }
      this.toastr.error(err.error.msg,'Error',{timeOut:3000})
    });
  }

}
