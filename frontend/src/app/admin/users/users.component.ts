import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router) { }

  agents:any =[];
  dtRendered:boolean = false;
  dtOptions:any = {}
  ngOnInit(): void {
    this.adminService.getAgents().subscribe((data)=>{
      this.agents = data;
      setTimeout(()=>{
        $("#agentTable").DataTable();
      },100);
     },(err)=>{
       this.toastr.error(err.name,"error",{timeOut:3000})
     })
  }

  editAgent(id:string){
    this.router.navigate([`/admin/agent/${id}`]);
  }
  deleteAgent(id:string){
    this.adminService.deleteAgent(id).subscribe((data)=>{
      this.router.navigate(['admin/dashboard']);
      this.toastr.success('Agent deleted Successfully','Success',{timeOut:3000});
    },(err)=>{
      this.router.navigate(['admin/dashboard']);
      this.toastr.error(err.name, 'Error', {timeOut : 3000});
    })
  }
}
