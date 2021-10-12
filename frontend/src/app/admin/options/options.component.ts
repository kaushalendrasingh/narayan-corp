import { AdminService } from './../../admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private adminService: AdminService,
    private toastr: ToastrService,
    private route: Router,
    private modalService: NgbModal) { }
    report : any = [];
    requirement : any = [];
    total:number = 0;
    date :string = '';
  ngOnInit(): void {
  }

  passwordValue : any = {};
  closeResult: string = "";

  Userdata = new FormGroup({
    password : new FormControl('', [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
  });
  reportData = new FormGroup({
    reportDate : new FormControl('', [Validators.required])
  });
  requirementValue = new FormGroup({
    name : new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required,Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')])
  });

  get f(){
    return this.Userdata.controls;
  }
  get f1(){
    return this.reportData.controls;
  }
  get f3(){
    return this.requirementValue.controls;
  }


  generateRequirement(content : any){
    this.adminService.generateRequirement().subscribe((data:any)=>{
      this.requirement = data.data
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason :any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      this.toastr.success('Requirement generated successfully','Success',{timeOut:2000});
      this.route.navigate(['/admin/options']);
    }, (err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000});
      this.route.navigate(['/admin/options']);
    });
  }
  deleteRequirement(){
    this.adminService.deleteRequirement().subscribe((data)=>{
      this.toastr.success('Requirement deleted Successfully','Success',{timeOut:2000});
      this.route.navigate(['/admin/dashboard']);
    }, (err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000});
      this.route.navigate(['/admin/options']);
    });
  }
  onRequirementSubmit(){
    this.adminService.addRequirement(this.requirementValue.value).subscribe((data)=>{
      this.toastr.success('Requirement added Successfully','Success',{timeOut:2000});
      this.requirementValue.reset();
    }, (err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000});
      this.requirementValue.reset();
    });
  }
  onSubmit(){
    this.passwordValue._id = localStorage.getItem('_id');
    this.passwordValue.password = this.Userdata.value.password;
    this.adminService.changePassword(this.passwordValue).subscribe((data)=>{
      this.toastr.success('Password Updated Successfully','Success',{timeOut:2000});
      this.Userdata.reset();
    }, (err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000});
      this.Userdata.reset();
    });
  }

  onReportSubmit(content : any){
    this.adminService.generateReport(this.reportData.value.reportDate).subscribe((data:any)=>{
      this.report = data.data;
      this.total = data.total;
      this.date = data.date;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason :any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      this.toastr.success('Report generated successfully','Success',{timeOut:2000});
      this.reportData.reset();
    }, (err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000});
      this.reportData.reset();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
