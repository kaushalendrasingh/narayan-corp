import { FrontService } from './../../front.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.css']
})
export class AddRequirementComponent implements OnInit {

  constructor(private frontSerice: FrontService,
    private toastr: ToastrService,
    private route: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  requirement : any = [];
  closeResult: string = "";

  requirementValue = new FormGroup({
    name : new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required,Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')])
  });

  get f3(){
    return this.requirementValue.controls;
  }
  medicineTitle : string = "Manage Requirements"
  generateRequirement(content : any){
    this.frontSerice.generateRequirement().subscribe((data:any)=>{
      this.requirement = data.data
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason :any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      this.route.navigate(['/requirements']);
      this.toastr.success('Requirement generated successfully','Success',{timeOut:2000});
    }, (err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000});
      this.route.navigate(['/requirements']);
    });
  }
  deleteRequirement(){
    this.frontSerice.deleteRequirement().subscribe((data)=>{
      this.toastr.success('Requirement deleted Successfully','Success',{timeOut:2000});
      this.route.navigate(['/requirements']);
    }, (err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000});
      this.route.navigate(['/requirements']);
    });
  }
  onRequirementSubmit(){
    this.frontSerice.addRequirement(this.requirementValue.value).subscribe((data)=>{
      this.toastr.success('Requirement added Successfully','Success',{timeOut:2000});
      this.requirementValue.reset();
    }, (err)=>{
      this.toastr.error(err.name,'Error',{timeOut:3000});
      this.route.navigate(['/sales']);
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
