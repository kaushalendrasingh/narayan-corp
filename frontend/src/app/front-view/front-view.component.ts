import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.component.html',
  styleUrls: ['./front-view.component.css'],
  host: {'class': 'backGroundImg'}
})
export class FrontViewComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }
  errResponse:string = '';
  UserData = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit(): void {
    if(this.auth.isUserLoggedIn()){
      this.router.navigate(['/sales'])
    }
  }

  get f(){
    return this.UserData.controls;
  }
  onSubmit(){
    this.auth.loginUser('user/login',this.UserData.value).subscribe((data)=>{
      if(data.status){
        this.toastr.success("Sucessfully login redirecting to Dashoard","success",{timeOut:2000})
        this.router.navigate(["/sales"]);
      }
    },(err)=>{
      this.toastr.error(err.error.msg,"error",{timeOut:3000});
    });
  }
}
