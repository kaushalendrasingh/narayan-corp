import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private auth : AuthService, private router: Router, private toastr: ToastrService) { }
  UserData = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit(): void {
    if(this.auth.isAdminUserLoggedIn()){
      this.router.navigate(['/admin/dashboard'])
    }
  }
  errResponse:string = '';

  get f(){
    return this.UserData.controls;
  }

  onSubmit(){
    this.auth.loginUser('admin/login', this.UserData.value).subscribe((data)=>{
      if(data.status){
        this.toastr.success("Sucessfully login Redirecting to Dashboard","success",{timeOut:2000})
        this.router.navigate(["/admin/dashboard"]);
      }

    },(err)=>{
      this.toastr.error(err.error.msg,"error",{timeOut:3000})
    })
  }

}
