import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private adminService : AdminService,
    private toastr: ToastrService,
    private router : Router,
    private activatedRoute : ActivatedRoute) { }

    agent:any = {}
    isAddMode : boolean = true;
    agentValues :any;
    id: string = "";

  agentData = new FormGroup({
    password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    agentDOB: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  agentTitle : string = "Add Agent";
  readOnly : boolean = false
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getAgentById(id);
  }

  get f(){
    return this.agentData.controls;
  }

  getAgentById(id: string){
    if(id){
      this.readOnly = true;
      this.agentTitle = "Edit Agent";
      this.adminService.getAgentById(id).subscribe((data)=>{
        this.agent = data;
        this.isAddMode = false;
        this.id = id;
      },(err)=>{
        this.toastr.error(err.error.msg,'Error',{timeOut : 3000});
      });
    } else {
      this.agent.data = {
        name:null,
        username:null,
        agentDOB:null,
        password:null,
        role:null,
        email:null
      };
    }
  }

  onSubmit(){
    if(!this.isAddMode){
      this.agentValues = this.agentData.value;
      console.log(this.agentData.value)
      this.agentValues._id = this.id;
      this.adminService.updateAgent(this.agentValues).subscribe((data)=>{
        this.toastr.success('agent Updated Successfully','Success',{timeOut:2000});
        this.agentData.reset();
      }, (err)=>{
        this.toastr.error(err.error.msg,'Error',{timeOut:3000});
        this.agentData.reset();
      });
    } else {
      this.adminService.addAgent(this.agentData.value).subscribe((data)=>{
        this.agentData.reset();
        this.toastr.success('Agent Added Sucessfully', 'success', {timeOut:2000});
      }, (err)=>{
        this.agentData.reset();
        this.toastr.error(err.error.msg, 'error', {timeOut:3000});
      });
    }

  }
}
